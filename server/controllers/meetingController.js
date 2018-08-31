//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

function getMeetings(request, response) {
    response.status(200).send('ok');
}

function addMeeting(request, response) {
    response.status(200).send('ok');
}

function editMeeting(request, response) {
    response.status(200).send('ok');
}