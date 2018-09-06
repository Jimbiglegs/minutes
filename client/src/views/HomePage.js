import React, {Component} from 'react';
import UpcomingMeetingLists from '../containers/UpcomingMeetingLists';
import TaskLists from '../containers/TaskLists';

export default class HomePage extends Component{
    render(){
        return(
         <div className='row'>
            <div className='col'>
                <h3>Upcoming Meetings</h3>
                <UpcomingMeetingLists />
            </div>
            <div className='col'>
                <h3>Action Items</h3>
                <TaskLists showButtons={false} />
            </div>
         </div>
        );
    }
}