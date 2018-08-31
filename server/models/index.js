const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/minutes', { useNewUrlParser: true });

const taskModel = require('./task');
const meetingModel = require('./meeting');
const userModel = require('./user');
const teamModel = require('./team');

module.exports = {
  Task: taskModel,
  Meeting: meetingModel,
  User: userModel,
  Team: teamModel
};
