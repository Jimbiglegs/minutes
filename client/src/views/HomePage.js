import React, {Component} from 'react';
import MeetingLists from '../containers/MeetingLists';
import TaskLists from '../containers/TaskLists';

export default class HomePage extends Component{
    render(){
        return(
         <div className='row'>
            <div className='col'>
                <h3>Upcoming Meetings</h3>
                <MeetingLists />
            </div>
            <div className='col'>
                <h3>Action Items</h3>
                <TaskLists />
            </div>
         </div>
        );
    }
}