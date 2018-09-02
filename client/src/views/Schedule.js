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
        location: null,
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

    onLocationChange = (e) => {
        this.setState( { location : e.target.value });
    }

    onAttendeesChange = (attendees) => {
        this.setState({ attendees: attendees });
    }

    //post call
    postSchedule = () => {

    let url = 'http://localhost:3000/api/meeting';

    console.log('Date from front-end: ', this.state.date);

        //format date
        let date = this.state.date.format('DD-MMM-YYYY');

        //format time
        let time = this.state.time.format('hh:mm a');

        axios.post(url, {
            title : this.state.title,
            date: date,
            time: time,
            location: this.state.location,
            owner: 'niti@niti.com',
            attendees: this.state.attendees
        }).then((data) => {    
          console.log('sending data: ', data);
        }).catch((err) => {              
            console.log('Error retured API in posting schedule:', err);
        });
    }      
    

    
    render() {
        return <Group>
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
                        <input type="text" class="form-control" id="meetingLocation" onChange={ this.onLocationChange }/>
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
                        <button type="button" className='btn btn-primary' onClick={this.postSchedule}>Schedule</button>
                    </div>
                </div>
            </form>
        </Group>;
    }

}
