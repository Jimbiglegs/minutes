import * as React from 'react';
import InputTask from '../component/InputTask';
import TaskDetails from '../component/TaskDetails';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import moment from 'moment';
import axios from 'axios';
import Utils from '../Utils';
import { connect } from 'react-redux';
import * as AppStoreActions from './../AppStoreActions';
import { withRouter } from 'react-router-dom';
import IfClause from '../component/IfClause';

class CreateNotes extends React.Component {
    state = {
        tasks: [ new TaskDetails() ],
        title : null,
        date: null,
        time: null,
        location:null,
        attendees: [],
        editNotesFlag: false,
        meetingID: null,
        duration: 0.5,

        titleError: false,
        dateError: false,
        timeError: false,
        locationError: false,
        attendeesError: false,
        durationError: false,

        teams: []
    }

    componentDidMount() {
        if(!(this.props.location && this.props.location.state)) {
            // no meeting in router
            axios.get('https://minutes-api.herokuapp.com/api/teams?owner=' + this.props.profile.profileObj.email)
                .then((response) => {
                    console.log('Tasks retrieved from database : ', response)
                    this.setState({ teams : response.data });
                }).catch((e) => {
                    console.log('error fetching meetings', e);
                });
            return;
        }

        let meetingPassed = this.props.location.state.meeting;
        console.log('meeting passed via router: ', meetingPassed);
        if(!meetingPassed) {
            // null meeting in router
            return;
        }

        // set meeting details
        this.setState({ 
            title : meetingPassed.title,
            date: moment(meetingPassed.day),
            time: moment(meetingPassed.time, 'hh:mm a'),
            location: meetingPassed.location,
            editNotesFlag: true,
            meetingID: meetingPassed._id,
            attendees : meetingPassed.attendees,
            duration: meetingPassed.duration
        });

        // we also need to load data for items
        // that match this meeting
        axios.get('https://minutes-api.herokuapp.com/api/meeting/' + meetingPassed._id + '/tasks')
            .then((response) => {  
                let tasksOnServer = response.data;
                console.log('tasks for this meeting: ', tasksOnServer);
                if(tasksOnServer.length > 0) {
                    this.setState( { tasks : tasksOnServer });
                }
            }).catch((error) => {

            });
    }

    publishMeeting = () => {
        let meetingID = this.state.meetingID;
        if(!meetingID) {
            this.props.showToast('Only a saved meeting can be published', 'danger');
            return;
        }

        axios.get('https://minutes-api.herokuapp.com/api/meeting/' + meetingID + '/publish?owner=' + this.props.profile.profileObj.email)
            .then((response) => {
                console.log('done saving the meeting:', response.data);
                this.props.showToast('Meeting published successfully', 'success');
                this.props.history.push('/home');
            }).catch((error) => {
                this.props.showToast('Unable to publish meeting', 'danger');
            });
    }

    saveMeetingNotes = () => {
        let editNotes = this.state.editNotesFlag;
        let meetingID = this.state.meetingID;

        if  (editNotes && meetingID !== '') {
            this.saveMeetingTasks(meetingID, this.state.tasks);
            return;
        }

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
            attendeesError: false
        });

        // start validation
        if(Utils.isEmpty(title)) {
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

       if(Utils.isEmpty(attendees)) {
            this.props.showToast('Atleast one attendee is required', 'danger');
           this.setState({ attendeesError : true });
           return;
       }

       for(let eindex = 0; eindex < attendees.length; eindex++) {
            let em = attendees[eindex];

            if(!Utils.validateEmail(em)) {
                this.props.showToast('Not a valid email address: ' + em, 'danger');
                this.setState({ attendeesError : true });
                return;
            }
        }

        // first save the meeting
        axios.post('https://minutes-api.herokuapp.com/api/meeting', {
            title : title,
            date: date.format('DD-MMM-YYYY'),
            time: time.format('hh:mm a'),
            location: location,
            owner: this.props.profile.profileObj.email,
            attendees: attendees,
        }).then((response) => {
            console.log('done saving the meeting:', response.data);

            // let's save the tasks
            let tasks = this.state.tasks;
            let meetingID = response.data['_id'];
            console.log('meeting ID is: ', meetingID);

            for(let index = 0; index < tasks.length; index++) {
                tasks[index].meetingID = meetingID;
            }
            
            this.setState( { meetingID : meetingID, editNotesFlag : true } );
            this.saveMeetingTasks(meetingID, tasks);
        }).catch((err) => {              
            console.log('Error retured API in saving new meeting notes:', err);
        });
    }

    saveMeetingTasks = (meetingID, tasks) => {
        console.log('saving tasks for id: ', meetingID, tasks);

        let tasksToSave = [];
        for(let index = 0; index < tasks.length; index++) {
            const task = tasks[index];

            if(Utils.isEmpty(task.title) && Utils.isEmpty(task.topic)) {
                continue;
            }

            task.meetingID = meetingID;
            tasksToSave.push(task);
        }

        let url = 'https://minutes-api.herokuapp.com/api/tasks';
        axios.post(url, {
            id: meetingID,
            owner: this.props.profile.profileObj.email,
            tasks: tasksToSave
        }).then((response) => {    
            let serverTasks = response.data;
            console.log('done saving tasks: ', serverTasks);
            
            if(serverTasks.length === 0) {
                serverTasks.push(new TaskDetails());
            }
            
            this.setState({ tasks : serverTasks});
            this.props.showToast('Meeting notes have been saved.', 'success');
        }).catch((err) => {              
            console.log('Error retured API in saving old meeting notes:', err);
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

    onAttendeesChange = (attendees) => {
        this.setState({ attendees: attendees });
    }
    
    addNextTaskIfNeeded = () => {
        let tasks = this.state.tasks;
        tasks.push(new TaskDetails());
        this.setState({ tasks: tasks });
    }

    onLocationChange = (e) => {
        this.setState( { location : e.target.value });
    }

    onDurationChange = (e) => {
        this.setState( { duration : e.target.value });
    }

    updateTask = (index, field, value) => {
        let tasks = this.state.tasks;
        let task = tasks[index];
        task[field] = value;

        this.setState({ tasks : tasks });
    }


    renderTaskDetails = () => {
        let result = [];
        let tasks = this.state.tasks;

        for(let index = 0; index < tasks.length; index++) {
            let task = tasks[index];

            result.push(<InputTask key={ task._id } onNextTask={ this.addNextTaskIfNeeded } task={ task } 
                                   onTitleChange={ (e) => this.updateTask(index, 'title', e.target.value) } 
                                   onTopicChange={ (e) => this.updateTask(index, 'topic', e.target.value) }
                                   onTaskLevelChange={ (e) => this.updateTask(index, 'level', e.target.value) }
                                   onDateChange={ (e) => this.updateTask(index, 'due', e) }
                                   onAssigneeChange={ (e) => this.updateTask(index, 'assignee', e) }
                                   attendees={this.state.attendees}  />)
        }

        return result;
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
        return <form >
            <div className='form-row'>
                <div className="form-group col">
                    <label for="meetingTitle">Meeting Title</label>
                    <input type="text" 
                            className={ "form-control " + (this.state.titleError ? 'is-invalid' : '') }
                            id="meetingTitle" placeholder="My Meeting" 
                            onChange={ this.onTitleChange } 
                            value={ this.state.title } 
                            disabled={ this.state.editNotesFlag} />
                </div>
            </div>
            <div className='form-row'>
                <div className="form-group col">
                    <label for="meetingDate">Meeting Date</label>
                    <DatePicker selected={ this.state.date } 
                                onChange={ this.onDateChange } 
                                openToDate={this.state.date } 
                                disabled={ this.state.editNotesFlag }
                                minDate={moment()}
                                className={ this.state.dateError ? 'is-invalid' : '' } />
                </div>
                <div className="form-group col">
                    <label for="meetingTime">Meeting Time</label>
                    <DatePicker selected={ this.state.time } 
                                onChange={ this.onTimeChange }
                                showTimeSelect showTimeSelectOnly timeIntervals={ 30 }
                                dateFormat="LT" timeCaption="Time" 
                                value={ this.state.time } 
                                disabled={ this.state.editNotesFlag}
                                className={ this.state.timeError ? 'is-invalid' : '' } />
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
                    <input type="text" className="form-control" id="meetingLocation" 
                           onChange={ this.onLocationChange } 
                           value={ this.state.location }
                           autocomplete='off'
                           className={ "form-control " + (this.state.locationError ? 'is-invalid' : '') }
                           disabled={ this.state.editNotesFlag} />
                </div>                                     
                
            </div>
            <div className='form-row'>
                <div className="form-group col">
                    <label for="meetingAttendees">Meeting Attendees</label>
                    <TagsInput value={ this.state.attendees } 
                               onChange={ this.onAttendeesChange }
                               className={ 'react-tagsinput ' + (this.state.attendeesError ? 'is-invalid' : '') }
                               disabled={ this.state.editNotesFlag} 
                               inputProps={ { placeholder : 'Email' } }/>
                    <IfClause condition={ this.state.teams.length > 0 }>
                        <br />
                        Available teams: { this.getTeamsAsButtons() }
                    </IfClause>
                </div>
            </div>

            <h3>Action Items</h3>
            <div className='action-items'>
                { this.renderTaskDetails() }
            </div>

            <div className='form-row'>
                <div className='form-group col text-right'>
                    <button type="button" 
                            className='btn btn-primary' 
                            onClick={ this.saveMeetingNotes }>Save</button>
                    &nbsp;
                    <button type="button" 
                            className='btn btn-success'
                            onClick={ this.publishMeeting }>Publish</button>
                </div>
            </div>
        </form>;
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile
    };
}
  
export default connect(mapStateToProps, AppStoreActions.default)(withRouter(CreateNotes));
