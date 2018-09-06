const Utils = require('./../utils');

//adding models
const database = require('../models');

function getTeams(request, response) {
    let owner = request.query.owner;

    if(Utils.isEmpty(owner)) {
        response.status(400).send('team owner is required');
        return;
    }

    let teams = database.Team.find( { owner : owner }, null, { sort : { name : 1 } }, function(error, serverTeams) {
        if(error) {
            console.log('unable to get teams from database');
            response.status(500).send('error reading db');
            return;
        }

        console.log('teams found as:', serverTeams);
        response.json(serverTeams);
    });
}

function addTeam(request, response) {
    let name = request.body.name;
    let owner = request.body.owner;
    let members = request.body.members;
    let slack = request.body.slack;

    if(Utils.isEmpty(name)) {
        response.status(400).send('team name is required');
        return;
    }

    if(Utils.isEmpty(owner)) {
        response.status(400).send('team owner is required');
        return;
    }

    if(Utils.isEmpty(members)) {
        response.status(400).send('team members is required');
        return;
    }

    let team = {
        name : name,
        owner : owner,
        slack: slack,
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