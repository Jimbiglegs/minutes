//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

function getTasks(request, response) {
    response.status(200).send('ok');
}

function addTask(request, response) {
    response.status(200).send('ok');
}

function editTask(request, response) {
    response.status(200).send('ok');
}

// exporting signin for other files
module.exports = {
    getTasks : getTasks,
    addTask : addTask,
    editTask : editTask
};