//adding models
const database = require('../models');
const utils  = require('../utils');

var badHttpRequestCode = 400;

function getMeetings(request, response) {

        //get meetings
        database.Meeting.find({}, null, { sort : { day : 1 } }, function (error, getMeetings){
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

    let meetingID = request.body.meetingID;
    if(!utils.isEmpty(meetingID)) {
        editMeeting(request, response);
        return;
    }

    let title = request.body.title;
    let date = request.body.date;
    let time = request.body.time;
    let location = request.body.location;
    let owner = request.body.owner;
    let attendees = request.body.attendees;
    let duration = request.body.duration;
  
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
        console.log("date required");
        response.status(badHttpRequestCode).send('Date is required');
        return;
    }

    if (utils.isEmpty(time)) {
        console.log("time required");
        response.status(badHttpRequestCode).send('time is required');
        return;
    }

    if (utils.isEmpty(duration)) {
        console.log("duration required");
        response.status(badHttpRequestCode).send('Duration is required');
        return;
    }

    if (utils.isEmpty(location)) {
        console.log("location required");
        response.status(badHttpRequestCode).send('Location is required');
        return;
    }

    if (utils.isEmpty(attendees)) {
        console.log("attendees required");
        response.status(badHttpRequestCode).send('Atleasy one attendee is required');
        return;
    }    

    let schedule = {
        title : title ,
        day : date ,
        time : time,
        location : location,
        owner : owner,
        attendees : attendees,
        duration: duration
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
        utils.sendSlack('Meeting named *' + title.trim() + '* has been scheduled for ' + date + ' at ' + time + '.' + 'By Owner: ' + owner);
        response.json(newSchedule);
    });
}

function editMeeting(request, response) {
    let meetingID = request.body.meetingID;
    if(utils.isEmpty(meetingID)) {
        response.status(400).send('bad request');
        return;
    }
    
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
        response.status(badHttpRequestCode).send('Atleast one attendee is required');
        return;
    }    

    //create meeting
    database.Meeting.findById(meetingID, function (error, saved) {
        if(error) {
            console.log('Error edit meeting: ', error);
            response.status(500).send('cannot find meeting in db');
            return;
        }

        if(saved.owner != owner) {
            response.status(401).send('unauthorized user');
            return;
        }

        saved.title = title;
        saved.day = date;
        saved.time = time;
        saved.location = location;
        saved.owner = owner;
        saved.attendees = attendees;

        saved.save(function(error2, updated) {
            if(error2) {
                console.log('unable to update meeting in database', error2);
                response.status(500).send('unable to update meeting');
                return;
            }

            response.json(updated);
        });
    });
    
}

function publishMeeting(request, response) {
    let meetingID = request.params.id;
    let owner = request.query.owner;

    if(utils.isEmpty(meetingID)) {
        response.status(400).send('meeting id is required');
        return;
    }

    if(utils.isEmpty(owner)) {
        response.status(400).send('owner is required');
        return;
    }

    database.Meeting.findById(meetingID, function(error, saved) {
        if(error) {
            console.log('error reading meeting from database');
            response.status(500).send('cannot find meeting');
            return;
        }

        if(saved.published) {
            response.status(400).send('meeting is already published');
            return;
        }

        if(saved.owner != owner) {
            response.status(400).send('meeting owner does not match');
            return;
        }

        saved.published = true;
        saved.save(function (error2, updated) {
            if(error2) {
                console.log('error publishing meeting from database');
                response.status(500).send('cannot publish meeting');
                return;
            }

            response.json(updated);
        });
    })
}

// exporting signin for other files
module.exports = {
    getMeetings : getMeetings,
    addMeeting : addMeeting,
    editMeeting : editMeeting,
    publishMeeting : publishMeeting
};