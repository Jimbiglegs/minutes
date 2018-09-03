import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Group from '../component/Group';
import axios from 'axios';
import Utils from '../Utils';

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
         const title = this.state.title;
         let date = this.state.date;
         let time = this.state.time;
         const location = this.state.location;
         const attendees = this.state.attendees;

         console.log(title)
        
         if(Utils.isEmpty(title)){
             Utils.error('Meeting title required');
             return;
         }

         if(Utils.isEmpty(date)){
            Utils.error('Meeting date required');
            return;
        }

        if(Utils.isEmpty(time)){
            Utils.error('Meeting time required');
            return;
        }

        if(Utils.isEmpty(location)){
            Utils.error('Meeting location required');
            return;
        }

        if(Utils.isEmpty(attendees)){
            Utils.error('Atleast one attendee is required');
            return;
        }

        //format date
        date = this.state.date.format('DD-MMM-YYYY');
        //format time
        time = this.state.time.format('hh:mm a');

        axios.post('http://localhost:3000/api/meeting', {
            title : this.state.title,
            date: date,
            time: time,
            location: this.state.location,
            owner: 'niti@niti.com',
            attendees: this.state.attendees
        }).then((data) => {    
          console.log('sending data: ', data);

          let event = new Event('minutes-toast');
          event.title = 'Meeting has been scheduled.';
          event.level = 'success';

          document.dispatchEvent(event);
        }).catch((err) => {              
            console.log('Error retured API in posting schedule:', err);

            let event = new Event('minutes-toast');
            event.title = 'Unable to schedule meeting.';
            event.level = 'danger';

            document.dispatchEvent(event);
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
