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
    let name = request.body.name;
    let owner = request.body.owner;
    let members = request.body.members;

    let team = {
        name : name,
        owner : owner,
        members : members
    }

    console.log('team to save:', team);

    database.Team.create(team, function (error, savedTeam) {
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