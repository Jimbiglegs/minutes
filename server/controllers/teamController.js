//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

function getTeams(request, response) {
    response.status(200).send('ok');
}

function addTeam(request, response) {
    response.status(200).send('ok');
}

function editTeam(request, response) {
    response.status(200).send('ok');
}

// exporting signin for other files
module.exports = {
    getTeams : getTeams,
    addTeam : addTeam,
    editTeam : editTeam
};