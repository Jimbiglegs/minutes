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