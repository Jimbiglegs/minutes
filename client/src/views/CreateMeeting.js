import React, {Component} from 'react';
import MeetingFormFields from '../containers/MeetingFormFields';

export default class CreateMeeting extends Component{
    render(){
        return(
            // <MeetingFormFields/>
            <form className='container'>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingTitle">Meeting Title</label>
                    <input type="email" class="form-control" id="meetingTitle" placeholder="My Meeting" />
                </div>
            </div>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingDate">Meeting Date</label>
                    <input type="email" class="form-control" id="meetingDate" placeholder="Date" />
                </div>
                <div class="form-group col">
                    <label for="meetingTime">Meeting Time</label>
                    <input type="email" class="form-control" id="meetingTime" placeholder="Time" />
                </div>
            </div>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingAttendees">Meeting Attendees</label>
                    <select class="custom-select mb-3" id='meetingAttendees'>
                        <option selected>Attendees</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div class='form-row'>
                <div class='form-group col text-right'>
                    <button type="button" className='btn btn-primary'>Save</button>
                    &nbsp;
                    <button type="button" className='btn btn-success'>Publish</button>
                </div>
            </div>
        </form>
        );
        
    }
}