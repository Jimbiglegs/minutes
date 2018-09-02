import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Group from '../component/Group';
import axios from 'axios';

export default class Schedule extends Component {

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

    //post call
    postSchedule = () => {

    let url = 'http://localhost:3000/meeting';

        axios.post(url, {
            title : title,
            date: date,
            time: time,
            location: location,
            owner: 'niti@niti.com',
            attendees: attendees
        }).then((data) => {    
          console.log('sending data');
        }).catch((err) => {              
            console.log('Error retured API in posting schedule:', err);
        });
    }      
    

    
    render() {
        return <Group>
            <h3>Schedule A Meeting</h3>
            <form className='container-fluid'>
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
                    <div class="form-group col">
                        <label for="meetingLocation">Meeting Location</label>
                        <input type="text" class="form-control" id="meetingLocation" />
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
            </form>
        </Group>;
    }

}
