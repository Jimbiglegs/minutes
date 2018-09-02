const mongoose = require('mongoose');

let meetingSchema = new mongoose.Schema({
    title: String,
    day: String,
    time: String,
    location: String,
    created: {
        type: Date,
        default: Date.now
    },
    owner: String,
    attendees: [String]
});

const meetingModel = mongoose.model('meetings', meetingSchema);

module.exports = meetingModel;
