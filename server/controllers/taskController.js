//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

function getTasks(request, response) {
    let owner = 'niti@niti.com';

    // "assignee" : owner
    database.Task.find( { }, function(error, tasks) {
        if(error) {
            console.log('unable to get tasks from database');
            response.status(500).send('error reading db');
            return;
        }

        response.json(tasks);
    });
}

function insertOrUpdateTask(task) {
    let id = task._id;
    let update = true;
    if(!id || id.startsWith('task-')) {
        delete task._id;
        update = false;
    }

    if(!update) {
        // this is an insert operation
        return new Promise((resolve, reject) => {
            database.Task.create(task, function(error, updatedTask) {
                if(error) {
                    console.log('error inserting task', error);
                    // store error in reject
                    reject(error);
                    return;
                }
    
                // store updated task in promise
                resolve(updatedTask);
            });
    
        });
    }

    // this is an update operation
    return new Promise((resolve, reject) => {
        database.Task.findById(task._id, function(error, savedTask) {
            if(error) {
                console.log('unable to find task in database', error);
                reject(error);
                return;
            }

            console.log('previous saved task: ', savedTask);

            savedTask.level = task.level;
            savedTask.title = task.title;
            savedTask.topic = task.topic;
            savedTask.due = task.due;
            savedTask.assignee = task.assignee;
            savedTask.owner = task.owner;

            savedTask.save(function(error2, saved) {
                if(error2) {
                    console.log('unable to update task in database', error2);
                    reject(error2);
                    return;
                }

                resolve(saved);
            })
        });
    });
}

function addTasks(request, response) {
    let owner = request.body.owner;
    let tasks = request.body.tasks;

    if(!tasks || tasks.length == 0) {
        response.status(200).send(tasks);
        return;
    }

    let promiseArray = [];
    for(let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        task.owner = owner;
        let promise = insertOrUpdateTask(task);
        promiseArray.push(promise);
    }

    Promise.all(promiseArray)
        .then((values) => {
            response.json(values);
        }).catch((error) => {
            response.status(500).send('task insert failed');
        });
}

function editTask(request, response) {
    response.status(200).send('ok');
}

// exporting signin for other files
module.exports = {
    getTasks : getTasks,
    addTasks : addTasks,
    editTask : editTask
};