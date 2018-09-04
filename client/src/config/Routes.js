import React, { Component } from 'react';

import Landing from '../views/Landing';
import Homepage from '../views/HomePage';
import Meetings from '../views/Meetings';
import TaskView from '../views/TaskView';
import CreateNotes from '../views/CreateNotes';
import Schedule from '../views/Schedule';

import { connect } from 'react-redux';
import { Route, Switch } from 'react-router' // react-router v4
import { withRouter } from 'react-router-dom';

class Routes extends Component{

    render() {
        return <Switch>
            <Route exact path="/" component={ Landing } />
            <Route exact path="/home" render={() => {
                console.log(this.props.st);

                if(!this.props.profile) {
                    this.props.history.push('/');
                    return null;
                }   
                return <Homepage />
            } 
        }
         />
            <Route exact path="/meetings" render={() => {
                if(!this.props.profile) {
                    this.props.history.push('/');
                    return null;
                }   
                return <Meetings />
            } 
        }
         />
            <Route exact path="/tasks" render={() => {
                if(!this.props.profile) {
                    this.props.history.push('/');
                    return null;
                }   
                return <TaskView />
            } 
        }
         />
            <Route exact path="/adhocMeeting" render={ () => {
                if(!this.props.profile) {
                    this.props.history.push('/');
                    return null;
                }  
                return <CreateNotes key='adhoc' />
            } } />
            <Route exact path="/createNotes" render={ () => {
                if(!this.props.profile) {
                    this.props.history.push('/');
                    return null;
                }                 
                return <CreateNotes key='create' />
            } } />
            <Route exact path="/scheduleMeeting" render={() => {
                if(!this.props.profile) {
                    this.props.history.push('/');
                    return null;
                }   
                return <Schedule />
            } 
        }
         />
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
