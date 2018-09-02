//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

const isEmpty = require('../isEmpty');

function getMeetings(request, response) {
    response.status(200).send('ok');
}

function addMeeting(request, response) {

    let  title = request.body.title;
    let  date = request.body.date;
    let  time = request.body.time;
    let location = request.body.location;
    let owner = request.body.email;
    let  attendees = request.body.attendees;

    //empty check
    if (repeatedcode.isEmpty(owner)) {
        console.log("owner empty");
        response.status(badHttpRequestCode).send('Owner is required');
        return;
    }

    if (repeatedcode.isEmpty(title)) {
        console.log("title empty");
        response.status(badHttpRequestCode).send('Title is required');
        return;
    }

    if (repeatedcode.isEmpty(date)) {
        console.log("date empty");
        response.status(badHttpRequestCode).send('Date is required');
        return;
    }

    if (repeatedcode.isEmpty(time)) {
        console.log("time");
        response.status(badHttpRequestCode).send('time is required');
        return;
    }

    if (repeatedcode.isEmpty(location)) {
        console.log("location");
        response.status(badHttpRequestCode).send('Location is required');
        return;
    }

    if (repeatedcode.isEmpty(attendees)) {
        console.log("attendees");
        response.status(badHttpRequestCode).send('Atleasy one attendee is required');
        return;
    }    

    let schedule = {
        title : title ,
        date : date ,
        time : time,
        location : location,
        owner : owner,
        attendees : attendees
    }

    //create meeting
    database.Meeting.create(schedule, function (error, newSchedule){
        if(error) {
            console.log('Error creating new Schedule');

            response.status(500).send('insert of new meeting into database failed');
        }

        console.log('New meeting is created as: ', newSchedule)
        response.schedule(newSchedule);
    })
}

function editMeeting(request, response) {
    response.status(200).send('ok');
}


// exporting signin for other files
module.exports = {
    getMeetings : getMeetings,
    addMeeting : addMeeting,
    editMeeting : editMeeting
};