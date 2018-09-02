//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

function getTasks(request, response) {
    response.status(200).send('ok');
}

function addTasks(request, response) {
    let owner = request.body.owner;
    let tasks = request.body.tasks;

    if(!tasks || tasks.length == 0) {
        response.status(200).send(tasks);
        return;
    }

    database.Task.create(tasks, function(error, updatedTasks) {
        if(error) {
            console.log('Error creating new task: ', error);
            response.status(500).send('unable to create tasks');
            return;
        }

        response.json(updatedTasks);
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