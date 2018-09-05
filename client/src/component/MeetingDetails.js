import React, {Component} from 'react';
import Group from '../component/Group';
import { connect } from 'react-redux';
import * as AllAppActions from './../AppStoreActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

class MeetingDetails extends Component {
    
    onTitleChange = (e) => {
        this.props.setMeetingTitle(e.target.value);
    }

    onDateChange = (e) => {
        this.props.setMeetingDate(e);
    }

    onTimeChange = (e) => {
        this.props.setMeetingTime(e);
    }

    onLocationChange = (e) => {
        this.props.setMeetingLocation(e.target.value);
    }

    onAttendeesChange = (attendees) => {
        this.props.setMeetingAttendees(attendees);
    }

    render() {
        return <Group>
            <div className='form-row'>
                <div className="form-group col">
                    <label for="meetingTitle">Meeting Title</label>
                    <input type="text" 
                            className={ "form-control " + (this.props.meetingError.titleError ? 'is-invalid' : '') }
                            id="meetingTitle" placeholder="My Meeting" 
                            onChange={ this.onTitleChange } 
                            value={ this.props.meeting.title } />
                </div>
            </div>
            <div className='form-row'>
                <div className="form-group col">
                    <label for="meetingDate">Meeting Date</label>
                    <DatePicker selected={ this.props.meeting.date } 
                                onChange={ this.onDateChange } 
                                className={ this.props.meetingError.dateError ? 'is-invalid' : '' } />
                </div>
                <div className="form-group col">
                    <label for="meetingTime">Meeting Time</label>
                    <DatePicker selected={ this.props.meeting.time } 
                                onChange={ this.onTimeChange }
                                showTimeSelect showTimeSelectOnly timeIntervals={ 30 }
                                dateFormat="LT" timeCaption="Time"
                                className={ this.props.meetingError.timeError ? 'is-invalid' : '' }  />
                </div>
                <div className="form-group col">
                    <label for="meetingLocation">Meeting Location</label>
                    <input type="text" 
                           className={ "form-control " + (this.props.meetingError.locationError ? 'is-invalid' : '') } 
                           id="meetingLocation" onChange={ this.onLocationChange }
                           value={ this.props.meeting.location } />
                </div>                    
            </div>
            <div className='form-row'>
                <div className="form-group col">
                    <label for="meetingAttendees">Meeting Attendees</label>
                    <TagsInput value={ this.props.meeting.attendees }
                            className={ 'react-tagsinput ' + (this.props.meetingError.attendeesError ? 'is-invalid' : '') }
                            onChange={ this.onAttendeesChange } />
                </div>
            </div>
        </Group>;
    }
}

const mapStateToProps = (state) => {   
    return {
        meeting: state.meeting,
        meetingError: state.meetingError
    };
};

export default connect(mapStateToProps, AllAppActions.default)(MeetingDetails);