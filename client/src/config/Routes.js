import React, { Component }from 'react';
import {Switch, Route} from 'react-router-dom';
import  Landing from '../views/Landing';
import homepage from '../views/HomePage';
import Meetings from '../views/Meetings';
import TaskView from '../views/TaskView';
import { withRouter } from 'react-router-dom';
import CreateNotes from '../views/CreateNotes';
import Schedule from '../views/Schedule';

class Routes extends Component{

    render() {
        return <Switch>
            <Route exact path="/" component={ Landing } />
            <Route exact path="/home" component={ homepage } />
            <Route exact path="/meetings" component={ Meetings } />
            <Route exact path="/tasks" component={ TaskView } />
            <Route exact path="/adhocMeeting" render={ () => {
                return <CreateNotes key='adhoc' />
            } } />
            <Route exact path="/createNotes" render={ () => {
                return <CreateNotes key='create' />
            } } />
            <Route exact path="/scheduleMeeting" component={ Schedule } />
        </Switch>;
    }
}

const MyRoutes = withRouter(Routes);

export default MyRoutes;