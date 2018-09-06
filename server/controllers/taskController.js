const Utils = require('../utils');

//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

function getMeetingTasks(request, response) {
    let meetingID = request.params.id;
    if(Utils.isEmpty(meetingID)) {
        response.status(400).send('meetingID is required');
        return;
    }

    database.Task.find( { meetingID : meetingID }, null, { sort : { due : 1 } },function(error, tasks) {
        if(error) {
            console.log('error reading tasks from db for meeting id: ' + meetingID);
            response.status(500).send('db error reading tasks');
            return;
        }

        response.json(tasks);
    });
}

function changeTaskStatus(request, response){
    let taskID = request.body.taskID;
    let status = request.body.status;

    database.Task.findById(taskID, function(error, savedTask) {
        if(error) {
            // did not find a task in DB with such ID
            return;
        }

        savedTask.status = status;
        savedTask.save(function(error2, saved) {
            if(error2) {
                console.log('unable to update task in database', error2);
                response.status(500).send(error2);
                return;
            }

            response.json(savedTask);
        });
    });
}

function getTasks(request, response) {
    let owner = request.query.owner;

    if(Utils.isEmpty(owner)) {
        response.status(400).send('Owner is required');
        return;
    }

    // "assignee" : owner
    database.Task.find( { }, null, { sort : { due : 1 } }, function(error, tasks) {
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
            });
        });
    });
}

function addTasks(request, response) {
    let owner = request.body.owner;
    let tasks = request.body.tasks;

    if(Utils.isEmpty(owner)) {
        response.status(400).send('owner is required');
        return;
    }

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
    editTask : editTask,
    getMeetingTasks : getMeetingTasks,
    changeTaskStatus : changeTaskStatus
};