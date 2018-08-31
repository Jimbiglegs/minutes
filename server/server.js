
const express = require('express');

const app = express();

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));

//add models
const database = require('./models');

//add controllers
const controllers = require('./controllers');

app.get('/api/meetings', controllers.MeetingController.getMeetings);
app.put('/api/meeting', controllers.MeetingController.addMeeting);
app.post('/api/meeting', controllers.MeetingController.editMeeting);

app.get('/api/tasks', controllers.TaskController.getTasks);
app.put('/api/task', controllers.TaskController.addTask);
app.post('/api/task', controllers.TaskController.editTask);

app.get('/api/teams', controllers.TeamController.getTeams);
app.put('/api/team', controllers.TeamController.addTeam);
app.post('/api/team', controllers.TeamController.editTeam);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is running on http://localhost:3000/');
});
