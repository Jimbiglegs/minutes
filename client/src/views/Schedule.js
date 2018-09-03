import React, {Component} from 'react';
import Group from '../component/Group';
import axios from 'axios';
import Utils from '../Utils';
import MeetingDetails from '../component/MeetingDetails';
import { connect } from 'react-redux';
import * as AllAppActions from './../AppStoreActions';

class Schedule extends Component {

    postSchedule = () => {
        console.log('schedule post called');

        const title = this.props.meeting.title;
        let date = this.props.meeting.date;
        let time = this.props.meeting.time;
        const location = this.props.meeting.location;
        const attendees = this.props.meeting.attendees;

        // start validation
        if(Utils.isEmpty(title)){
            this.props.showErrorToast('Meeting title required');
            this.props.setMeetingTitleError(true);
            return;
        }

        if(Utils.isEmpty(date)) {
            Utils.error('Meeting date required');
            this.setState({ dateError : true });
            return;
        }

        if(Utils.isEmpty(time)) {
            Utils.error('Meeting time required');
            this.setState({ timeError : true });
            return;
        }

        if(Utils.isEmpty(location)) {
            Utils.error('Meeting location required');
            this.setState({ locationError : true });
            return;
        }

        if(Utils.isEmpty(attendees)){
            Utils.error('Atleast one attendee is required');
            this.setState({ attendeesError : true });
            return;
        }

        //format date
        date = this.props.meeting.date.format('DD-MMM-YYYY');
        //format time
        time = this.props.meeting.time.format('hh:mm a');

        axios.post('http://localhost:3000/api/meeting', {
            title : title,
            date: date,
            time: time,
            location: location,
            owner: 'niti@niti.com',
            attendees: attendees
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