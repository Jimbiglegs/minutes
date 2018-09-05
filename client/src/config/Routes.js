import React, { Component }from 'react';
import {Switch, Route} from 'react-router-dom';
import  Landing from '../views/Landing';
import homepage from '../views/HomePage';
import Meetings from '../views/Meetings';
import TaskView from '../views/TaskView';
import CreateNotes from '../views/CreateNotes';
import Schedule from '../views/Schedule';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      location: state.router.location.pathname
    };
  }
  
  export default connect(mapStateToProps)(withRouter(Routes));
