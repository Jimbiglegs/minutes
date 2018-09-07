# Minutes

`minutes` is an online application to track meeting notes
for scheduled meetings, track various action items and help
teams self-organize.

## Technologies Used

* HTML5, CSS, JavaScript
* Bootstrap 4.0
* NodeJS
* MongoDB
* MongooseJS
* ExpressJS
* Slack SDK

## Modules

The project folders include:

* server: the API server built using ExpressJS, Mongoose and MongoDB
* client: React application

To run react application:

```
$ cd client
$ npm run start
```

React start at http://localhost:3001/

To run the server:

```
$ cd server
$ nodemon server.js
```

API server starts at http://localhost:3000/

## Features

* Google Authentication
* Landing page
* Create/edit/schedule meetings
* Create/edit teams
* Take notes during a meeting
* Create/view/update meeting action items
* Slack integration to push *New Meeting* alert to channel

## Database

The following collections are used:

* meeting
* teams
* task

## Future Work

The following features can be added in future:

* Integrate with Google calendar
* Add Analytics
* Send emails to each user

## References

* Logo attribution to this <a href="https://clipartxtras.com/">clipartxtras.com</a>
* `Group` component based on Aux from https://github.com/gajus/react-aux
* `IfClause` component from https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e

## License

Copyright (C) 2018, Niti Singhal.
