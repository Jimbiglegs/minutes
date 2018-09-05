import React, { Component }from 'react';
import {Switch, Route} from 'react-router-dom';
import  Landing from '../views/Landing';
import HomePage from '../views/HomePage';
import Meetings from '../views/Meetings';
import TaskView from '../views/TaskView';
import CreateNotes from '../views/CreateNotes';
import Schedule from '../views/Schedule';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TeamsView from '../views/TeamsView';

class Routes extends Component{

    render() {
        return <Switch>
            <Route exact path="/" component={ Landing } />
            <Route exact path="/home" render={ () => {
                    if(!this.props.user) {
                        this.props.history.push('/');
                        return null;
                    }                   
                    return <HomePage />
                } } />
            <Route exact path="/meetings" render={ () => {
                    if(!this.props.user) {
                        this.props.history.push('/');
                        return null;
                    }                   
                    return <Meetings />
                } } />
            <Route exact path="/tasks" render={ () => {
                    if(!this.props.user) {
                        this.props.history.push('/');
                        return null;
                    }                   
                    return <TaskView />
                } } />
            <Route exact path="/teams" render={ () => {
                    if(!this.props.user) {
                        this.props.history.push('/');
                        return null;
                    }                   
                    return <TeamsView />
                } } />
            <Route exact path="/adhocMeeting" render={ () => {
                if(!this.props.user) {
                    this.props.history.push('/');
                    return null;
                } 
                return <CreateNotes key='adhoc' />
            } } />
            <Route exact path="/createNotes" render={ () => {
                if(!this.props.user) {
                    this.props.history.push('/');
                    return null;
                }                 
                return <CreateNotes key='create' />
            } } />
            <Route exact path="/scheduleMeeting" render={ () => {
                if(!this.props.user) {
                    this.props.history.push('/');
                    return null;
                }                 
                return <Schedule />
            } } />
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
