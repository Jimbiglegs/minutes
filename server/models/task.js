const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    title: String,
    meetingID: String,
    level: String,
    status: String,
    assignee: String,
    owner: String,
    published: Boolean,
    topic: String,
    created: {
        type: Date,
        default: Date.now
    },
    due: Date
});

const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel;