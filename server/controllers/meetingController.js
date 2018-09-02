//connecting db
const mongoose = require('mongoose');

//adding models
const database = require('../models');

const utils  = require('../utils');

var badHttpRequestCode = 400;

function getMeetings(request, response) {

        //get meetings
        database.Meeting.find({}, function (error, getMeetings){
            if(error) {
                console.log('Error getting Meetings');
    
                response.status(500).send('Getting meeting from database failed');
            }
    
            console.log('Got meetings as: ', getMeetings)
            response.json(getMeetings);
        })
}

function addMeeting(request, response) {

    console.log('addmeeting called...');

    let title = request.body.title;
    let date = request.body.date;
    let time = request.body.time;
    let location = request.body.location;
    let owner = request.body.owner;
    let attendees = request.body.attendees;

    //empty check
    if (utils.isEmpty(owner)) {
        console.log("owner empty");
        response.status(badHttpRequestCode).send('Owner is required');
        return;
    }

    if (utils.isEmpty(title)) {
        console.log("title empty");
        response.status(badHttpRequestCode).send('Title is required');
        return;
    }

    if (utils.isEmpty(date)) {
        console.log("date empty");
        response.status(badHttpRequestCode).send('Date is required');
        return;
    }

    if (utils.isEmpty(time)) {
        console.log("time");
        response.status(badHttpRequestCode).send('time is required');
        return;
    }

    if (utils.isEmpty(location)) {
        console.log("location");
        response.status(badHttpRequestCode).send('Location is required');
        return;
    }

    if (utils.isEmpty(attendees)) {
        console.log("attendees");
        response.status(badHttpRequestCode).send('Atleasy one attendee is required');
        return;
    }    

    let schedule = {
        title : title ,
        day : date ,
        time : time,
        location : location,
        owner : owner,
        attendees : attendees
    }

    console.log('trying to create meeting...');

    //create meeting
    database.Meeting.create(schedule, function (error, newSchedule) {
        if(error) {
            console.log('Error creating new Schedule: ', error);

            response.status(500).send('insert of new meeting into database failed');
            return;
        }

        console.log('New meeting is created as: ', newSchedule);
        response.json(newSchedule);
    });
}

function editMeeting(request, response) {
    const id = request.params.id;
    const owner = request.body.owner; 

    let attendees = request.body.attendees;

    console.log('meeting id: ' + id);
    console.log('owner email: ' + owner);

    // // find and save
    // database.Meeting.findOne({ _id : id }, function (error, findMeeting) {
    //     if (error) {
    //         console.log('error editing attendees');
    //         response.status(500).send('insert attendees into database failed');
    //         return;
    //     }
        
    //     if(findMeeting.owner != owner) {
    //         console.log('different owner editing this meeting');
    //         response.status(401).send('unauthorized user editing meeting');
    //         return;
    //     }

    // // find and save
    // database.Tasks.findOne({ _id : id }, function (error, findTask) {
    //     if (error) {
    //         console.log('error editing task');
    //         response.status(500).send('insert task into database failed');
    //         return;
    //     }
       
    //     if(findTask.owner != owner) {
    //         console.log('different owner editing task of this meeting');
    //         response.status(401).send('unauthorized owner editing task');
    //         return;
    //     }

    //     findMeeting.attendees = attendees;
    //     findMeeting.edited = Date.now();
    //     findTask.tasks = tasks;      
    //     findTask.created = Date.now();

    //     // save in the meeting
    //     findMeeting.save(function (error2, saved) {
    //         if (error2) {
    //             response.status(500).send("something failed");
    //             return;
    //         }

    //     // save in the task
    //     findTask.save(function (error2, saved) {
    //         if (error2) {
    //             response.status(500).send("something failed");
    //             return;
    //         }            

    //         response.json(saved);
    //     });  
    // });
    
}


// exporting signin for other files
module.exports = {
    getMeetings : getMeetings,
    addMeeting : addMeeting,
    editMeeting : editMeeting
};