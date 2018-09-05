import React, {Component} from 'react';
import Group from '../component/Group';
import axios from 'axios';
import Utils from '../Utils';
import MeetingDetails from '../component/MeetingDetails';
import { connect } from 'react-redux';
import * as AllAppActions from './../AppStoreActions';

class Schedule extends Component {

    postSchedule = () => {
        console.log('schedule post called: ', this.props.meeting);

        const title = this.props.meeting.title;
        let date = this.props.meeting.date;
        let time = this.props.meeting.time;
        const location = this.props.meeting.location;
        const attendees = this.props.meeting.attendees;

        // reset all error messages
        this.props.clearMeetingErrors();

        // start validation
        if(Utils.isEmpty(title)) {
            this.props.showToast('Meeting title required', 'danger');
            this.props.setMeetingTitleError(true);
            return;
        }

        if(Utils.isEmpty(date)) {
            this.props.showToast('Meeting date required', 'danger');
            this.props.setMeetingDateError(true);
            return;
        }

        if(Utils.isEmpty(time)) {
            this.props.showToast('Meeting time required', 'danger');
            this.props.setMeetingTimeError(true);
            return;
        }

        if(Utils.isEmpty(location)) {
            this.props.showToast('Meeting location required', 'danger');
            this.props.setMeetingLocationError(true);
            return;
        }

        if(Utils.isEmpty(attendees)){
            this.props.showToast('Atleast one attendee is required', 'danger');
            this.props.setMeetingAttendeesError(true);
            return;
        }

        axios.post('http://localhost:3000/api/meeting', {
            title : title,
            date: this.props.meeting.date.format('DD-MMM-YYYY'),
            time: this.props.meeting.time.format('hh:mm a'),
            location: location,
            owner: 'niti@niti.com',
            attendees: attendees
        }).then((data) => {    
          console.log('sending data: ', data);

          this.props.showToast('Meeting has been scheduled.', 'success');
        }).catch((err) => {              
            console.log('Error retured API in posting schedule:', err);
            this.props.showToast('Unable to schedule the meeting.', 'danger');
        });
    }      
    

    
    render() {
        return <Group>
            <form className='container-fluid'>
                <MeetingDetails />

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
        meeting: state.meeting
    };
};

export default connect(mapStateToProps, AllAppActions.default)(Schedule);