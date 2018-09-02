
const express = require('express');

const app = express();

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });
  

//add models
const database = require('./models');

//add controllers
const controllers = require('./controllers');

app.get('/api/meetings', controllers.MeetingController.getMeetings);
app.put('/api/meeting/:id', controllers.MeetingController.editMeeting);
app.post('/api/meeting', controllers.MeetingController.addMeeting);

app.get('/api/tasks', controllers.TaskController.getTasks);
app.post('/api/tasks', controllers.TaskController.addTasks);
app.post('/api/task', controllers.TaskController.editTask);

app.get('/api/teams', controllers.TeamController.getTeams);
app.put('/api/team', controllers.TeamController.addTeam);
app.post('/api/team', controllers.TeamController.editTeam);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is running on http://localhost:3000/');
});
