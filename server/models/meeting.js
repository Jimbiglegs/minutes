const mongoose = require('mongoose');

let meetingSchema = new mongoose.Schema({
    title: String,
    level: String,
    status: String,
    day: Number,
    time: Number,
    created: {
        type: Date,
        default: Date.now
    },
    owner: String,
    attendees: [String]
});

const meetingModel = mongoose.model('meetings', meetingSchema);

module.exports = meetingModel;
