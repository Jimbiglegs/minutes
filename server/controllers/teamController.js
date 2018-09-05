//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

function getTeams(request, response) {
    let owner = 'niti@niti.com';

    let teams = database.Team.find( { owner : owner }, null, { sort : { name : 1 } }, function(error, tasks) {
        if(error) {
            console.log('unable to get teams from database');
            response.status(500).send('error reading db');
            return;
        }

        response.json(teams);
    });
}

function addTeam(request, response) {
    let name = request.body.title;
    let owner = request.body.date;
    let members = request.body.time;

    let team = {
        name : name,
        owner : owner,
        members : members
    }

    database.Meeting.create(schedule, function (error, savedTeam) {
        if(error) {
            console.log('unable to save team');
            response.status(500).send('error saving team');
            return;
        }

        response.json(savedTeam);
    });
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