import React, {Component} from 'react';
import Group from '../component/Group';
import axios from 'axios';
import Utils from '../Utils';
import MeetingDetails from '../component/MeetingDetails';

export default class Schedule extends Component {

    // state = {
    //     title : null,
    //     date: null,
    //     time: null,
    //     location: null,
    //     attendees: [],

    //     titleError: false,
    //     dateError: false,
    //     timeError: false,
    //     locationError: false,
    //     attendeesError: false
    // }

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
            Utils.error('Meeting title required');
            this.setState({ titleError : true });
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
