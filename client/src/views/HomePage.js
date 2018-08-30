import React, {Component} from 'react';

export default class HomePage extends Component{
    render(){
        return
         <div className='row'>
            <div className='col'>
                <h3>Upcoming Meetings</h3>

                <MeetingList />
            </div>
            <div className='col'>
                <h3>Action Items</h3>

                <TaskList />
            </div>
         </div>
        
    }
}