# Minutes

`minutes` is an online application to track meeting notes
for scheduled meetings, track various action items and help
teams self-organize.

A demo version of the application is deployed at:
https://minutes.herokuapp.com/
https://minutes-api.herokuapp.com/

## Elevator Pitch

Everyone in day-job needs to attend meetings. Taking notes is cumbersome.
Tracking action items on each is a nightmare. Keeping track of updates
on all is next to impossible.

Meeting Minutes aims to solve the problem of capturing meeting minutes,
assigning action items, and tracking them to closure.

## Technologies Used

* HTML5, CSS, JavaScript
* ReactJS and Redux
* Bootstrap 4.0 & Font Awesome
* NodeJS
* MongoDB
* MongooseJS
* ExpressJS
* Google Authentication
* Google Calendar API
* Slack SDK

## Modules

The project consists of a front-end and a back-end application that
are available in *client* and *server* folders. Wireframes to the project
are available in *wireframes* folder.

### Client App

* Get the code from the repository: `$ git clone git@github.com/NitiSinghalGupta/minutes`
* Go to client: `cd client`
* Install node: `$ npm install`
* Run app: `$ npm run start`

React app starts at http://localhost:3000/

### Server App

* Get the code from the repository: `$ git clone git@github.com/NitiSinghalGupta/minutes`
* Go to server: `cd server`
* Install node: `$ npm install`
* Run a local MongoDB: `$ mongod`
* Run app: `$ nodemon server.js`

API server starts at http://localhost:3000/

## Features

* Google Authentication
* Landing page
* Create/edit/schedule meetings
* Create/edit teams
* Take notes during a meeting
* Create/view/update meeting action items
* Slack integration to push *New Meeting* alert to channel
* Integrate with Google calendar

## Database

The following collections are used:

* meeting
* teams
* task

## Future Work

The following features can be added in future:

* Update meetings in Google Calendar as they are updated in app
* Allow team based and meeting based slack channels
* Add more slack notifications, say, when items are assigned, updated
* Add reminders (emails/slack) of overdue and tasks requiring attention
* Add capability to attach meeting agenda before meeting starts
* Integrate to send emails

## References

* React docs: https://reactjs.org/
* Redux docs: https://redux.js.org/
* Redux Router docs: https://github.com/supasate/connected-react-router
* Bootstrap docs: http://getbootstrap.com/docs/4.1
* Axios docs: https://github.com/axios/axios
* MomentJS docs: https://github.com/moment/moment/
* Font awesome docs: https://fontawesome.com/
* Logo attribution to this <a href="https://clipartxtras.com/">clipartxtras.com</a>
* `Group` component based on Aux from https://github.com/gajus/react-aux
* `IfClause` component from https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
* React date picker: https://github.com/Hacker0x01/react-datepicker/
* React tags input: https://github.com/olahol/react-tagsinput
* Slack SDK: https://github.com/slackapi/node-slack-sdk
* Google Calendar API: https://developers.google.com/calendar/v3/reference/events/insert
* Google Developer Console: https://console.cloud.google.com/apis/credentials
* Font-Awesome Icon ToolTips : https://kazzkiq.github.io/balloon.css/

## License

Copyright (C) 2018, Niti Singhal.
