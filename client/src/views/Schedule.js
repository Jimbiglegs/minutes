import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Group from '../component/Group';
import axios from 'axios';
import Utils from '../Utils';
import { connect } from 'react-redux';
import * as AppStoreActions from './../AppStoreActions';
import { withRouter } from 'react-router-dom';
import IfClause from '../component/IfClause';
import moment from 'moment';

class Schedule extends Component {

    state = {
        title : null,
        date: null,
        time: null,
        location: null,
        duration: 0.5,
        attendees: [],

        titleError: false,
        dateError: false,
        timeError: false,
        locationError: false,
        attendeesError: false,
        durationError: false,

        teams: []
    }

    componentDidMount() {
        // fetch details of meeting
        if(this.props.location && this.props.location.state) {

            let meeting = this.props.location.state.meeting;
            if(meeting) {
                console.log('meeting passed to schedule:', meeting);
                // already have a meeting to display
                this.setState({
                    _id: meeting._id,
                    title: meeting.title,
                    date: moment(meeting.date),
                    time: moment(meeting.time, 'hh:mm a'),
                    location: meeting.location,
                    attendees: meeting.attendees,
                    duration: meeting.duration
                });
            }
        }

        // fetch list of teams
        axios.get('http://localhost:3000/api/teams?owner=' + this.props.profile.profileObj.email)
            .then((response) => {
                console.log('Tasks retrieved from database : ', response)
                this.setState({ teams : response.data });
            }).catch((e) => {
                console.log('error fetching meetings', e);
            });    
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

    onDurationChange = (e) => {
        this.setState( { duration : e.target.value } );
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
        const duration = this.state.duration;

        // reset all errors to false
        this.setState({
            titleError: false,
            dateError: false,
            timeError: false,
            locationError: false,
            attendeesError: false,
            durationError: false,
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

        if(Utils.isEmpty(duration)) {
            this.props.showToast('Meeting duration required', 'danger');
            this.setState({ durationError : true });
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

        const existingID = this.state._id;

        axios.post('http://localhost:3000/api/meeting', {
            meetingID: existingID,
            title : title,
            date: date,
            time: time,
            duration: duration,
            location: location,
            owner: this.props.profile.profileObj.email,
            attendees: attendees
        }).then((data) => {    
          console.log('sending data: ', data);
          if(existingID) {
            this.props.showToast('Meeting has been updated.', 'success');
          } else {
            this.props.showToast('Meeting has been scheduled.', 'success');
          }

          this.props.history.push('/home');
        }).catch((err) => {              
            console.log('Error retured API in posting schedule:', err);
            this.props.showToast('Unable to schedule meeting.', 'danger')
        });
    }      
    
    getTeamsAsButtons = () => {
        let result = [];
        for(let index = 0; index < this.state.teams.length; index++) {
            let team = this.state.teams[index];

            result.push(<button type='button' className='btn-sm btn btn-primary mx-1' onClick={ (e) => { this.addTeamMembers(team) } }>{ team.name }</button>);
        }

        return result;
    }

    addTeamMembers = (team) => {
        if(!team) {
            return;
        }

        let attendees = this.state.attendees;
        let members = team.members;
        if(members && members.length > 0) {
            let merged = attendees.concat(members);
            this.setState({ attendees : merged});
        }

        return false;
    }
    
    render() {
        return <Group>
            <form className='container-fluid'>
                <div className='form-row'>
                    <div className="form-group col">
                        <label for="meetingTitle">Meeting Title</label>
                        <input type="text" 
                               className={ "form-control " + (this.state.titleError ? 'is-invalid' : '') } 
                               id="meetingTitle" 
                               placeholder="My Meeting" 
                               value={ this.state.title }
                               onChange={ this.onTitleChange }/>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group col">
                        <label for="meetingDate">Meeting Date</label>
                        <DatePicker selected={ this.state.date } 
                                    onChange={ this.onDateChange } 
                                    minDate={moment()}
                                    selected={ this.state.date } 
                                    className={ this.state.dateError ? 'is-invalid' : '' } />
                    </div>
                    <div className="form-group col">
                        <label for="meetingTime">Meeting Time</label>
                        <DatePicker selected={ this.state.time } 
                                    onChange={ this.onTimeChange }
                                    showTimeSelect showTimeSelectOnly timeIntervals={ 30 }
                                    dateFormat="LT" timeCaption="Time"
                                    selected={ this.state.time } 
                                    className={ this.state.timeError ? 'is-invalid' : '' }  />
                    </div>
                    <div className="form-group col">
                        <label for="meetingDuration">Meeting Duration</label>
                        <input type="number" 
                               className={ "form-control " + (this.state.durationError ? 'is-invalid' : '') } 
                               min='0.5'
                               max='4'
                               step='0.5'
                                value={ this.state.duration }
                               onChange={ this.onDurationChange }/>
                    </div>                    
                    <div className="form-group col">
                        <label for="meetingLocation">Meeting Location</label>
                        <input type="text" 
                               className={ "form-control " + (this.state.locationError ? 'is-invalid' : '') } 
                               id="meetingLocation" 
                               value={ this.state.location }
                               onChange={ this.onLocationChange }/>
                    </div>                    
                </div>
                <div className='form-row'>
                    <div className="form-group col">
                        <label for="meetingAttendees">Meeting Attendees</label>
                        <TagsInput value={ this.state.attendees }
                                   className={ 'react-tagsinput ' + (this.state.attendeesError ? 'is-invalid' : '') }
                                   onChange={ this.onAttendeesChange } />
                        
                        <IfClause condition={ this.state.teams.length > 0 }>
                            <br />
                            Available teams: { this.getTeamsAsButtons() }
                        </IfClause>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group col text-right'>
                        <IfClause condition={ !this.state._id }>
                            <button type="button" className='btn btn-primary' onClick={this.postSchedule}>Schedule</button>
                        </IfClause>

                        <IfClause condition={ this.state._id }>
                            <button type="button" className='btn btn-primary' onClick={this.postSchedule}>Update</button>
                        </IfClause>
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
