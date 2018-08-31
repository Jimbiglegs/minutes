import * as React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

export default class Schedule extends React.Component {

    state = {
        title : null,
        date: null,
        time: null,
        attendees: []
    }

    onTitleChange = (e) => {
        this.setState( { title : e.target.value });
    }

    onDateChange = (e) => {
        this.setState( { date : e });
    }

    onTimeChange = (e) => {
        this.setState( { time : e });
    }

    onAttendeesChange = (attendees) => {
        this.setState({ attendees: attendees });
    }
    
    render() {
        return <form className='container-fluid'>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingTitle">Meeting Title</label>
                    <input type="text" class="form-control" id="meetingTitle" placeholder="My Meeting" onChange={ this.onTitleChange }/>
                </div>
            </div>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingDate">Meeting Date</label>
                    <DatePicker selected={ this.state.date } onChange={ this.onDateChange } />
                </div>
                <div class="form-group col">
                    <label for="meetingTime">Meeting Time</label>
                    <DatePicker selected={ this.state.time } onChange={ this.onTimeChange }
                                showTimeSelect showTimeSelectOnly timeIntervals={ 30 }
                                dateFormat="LT" timeCaption="Time" />
                </div>
            </div>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingAttendees">Meeting Attendees</label>
                    <TagsInput value={ this.state.attendees } onChange={ this.onAttendeesChange } />
                </div>
            </div>

            <div class='form-row'>
                <div class='form-group col text-right'>
                    <button type="button" className='btn btn-primary'>Schedule</button>
                </div>
            </div>
        </form>;
    }

}
