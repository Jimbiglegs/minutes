import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Group from '../component/Group';
import axios from 'axios';
import Utils from '../Utils';
import { connect } from 'react-redux';
import * as AppStoreActions from './../AppStoreActions';
import { withRouter } from 'react-router-dom';

class Schedule extends Component {

    state = {
        title : null,
        date: null,
        time: null,
        location: null,
        attendees: [],

        titleError: false,
        dateError: false,
        timeError: false,
        locationError: false,
        attendeesError: false
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

        // reset all errors to false
        this.setState({
            titleError: false,
            dateError: false,
            timeError: false,
            locationError: false,
            attendeesError: false
        });
        
        // start validation
        if(Utils.isEmpty(title)){
            this.props.showToast('Meeting title required', 'danger');
            this.setState({ titleError : true });
            return;
        }

        if(Utils.isEmpty(date)) {
            this.props.showToast('Meeting date required', 'danger');
            this.setState({ dateError : true });
            return;
        }

        if(Utils.isEmpty(time)) {
            this.props.showToast('Meeting time required', 'danger');
            this.setState({ timeError : true });
            return;
        }

        if(Utils.isEmpty(location)) {
            this.props.showToast('Meeting location required', 'danger');
            this.setState({ locationError : true });
            return;
        }

        if(Utils.isEmpty(attendees)){
            this.props.showToast('Atleast one attendee is required', 'danger');
            this.setState({ attendeesError : true });
            return;
        }

        //format date
        date = this.state.date.format('DD-MMM-YYYY');
        //format time
        time = this.state.time.format('hh:mm a');

        axios.post('http://localhost:3000/api/meeting', {
            title : title,
            date: date,
            time: time,
            location: location,
            owner: 'niti@niti.com',
            attendees: attendees
        }).then((data) => {    
          console.log('sending data: ', data);
          this.props.showToast('Meeting has been scheduled.', 'success');
          this.props.history.push('/home');
        }).catch((err) => {              
            console.log('Error retured API in posting schedule:', err);
            this.props.showToast('Unable to schedule meeting.', 'danger')
        });
    }      
    

    
    render() {
        return <Group>
            <form className='container-fluid'>
                <div className='form-row'>
                    <div class="form-group col">
                        <label for="meetingTitle">Meeting Title</label>
                        <input type="text" className={ "form-control " + (this.state.titleError ? 'is-invalid' : '') } id="meetingTitle" placeholder="My Meeting" onChange={ this.onTitleChange }/>
                    </div>
                </div>
                <div className='form-row'>
                    <div class="form-group col">
                        <label for="meetingDate">Meeting Date</label>
                        <DatePicker selected={ this.state.date } 
                                    onChange={ this.onDateChange } 
                                    className={ this.state.dateError ? 'is-invalid' : '' } />
                    </div>
                    <div class="form-group col">
                        <label for="meetingTime">Meeting Time</label>
                        <DatePicker selected={ this.state.time } onChange={ this.onTimeChange }
                                    showTimeSelect showTimeSelectOnly timeIntervals={ 30 }
                                    dateFormat="LT" timeCaption="Time"
                                    className={ this.state.timeError ? 'is-invalid' : '' }  />
                    </div>
                    <div class="form-group col">
                        <label for="meetingLocation">Meeting Location</label>
                        <input type="text" className={ "form-control " + (this.state.locationError ? 'is-invalid' : '') } 
                               id="meetingLocation" onChange={ this.onLocationChange }/>
                    </div>                    
                </div>
                <div className='form-row'>
                    <div class="form-group col">
                        <label for="meetingAttendees">Meeting Attendees</label>
                        <TagsInput value={ this.state.attendees }
                                   className={ 'react-tagsinput ' + (this.state.attendeesError ? 'is-invalid' : '') }
                                   onChange={ this.onAttendeesChange } />
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

const mapStateToProps = (state) => {
    return {
      profile: state.profile
    };
}
  
export default connect(mapStateToProps, AppStoreActions.default)(withRouter(Schedule));
