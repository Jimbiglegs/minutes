import * as React from 'react';
import InputTask from '../component/InputTask';
import TaskDetails from '../component/TaskDetails';
import Group from '../component/Group';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

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
    }

    componentDidMount() {
        if(this.props.location && this.props.location.state) {
            let meetingPassed = this.props.location.state.meeting;
            console.log('meeting passed via router: ', meetingPassed);
            if(meetingPassed) {
                console.log('change state: ' + meetingPassed.title);
                console.log('time is: ', moment(meetingPassed.time, 'hh:mm a'));
                this.setState({ 
                    title : meetingPassed.title,
                    date: moment(meetingPassed.day),
                    time: moment(meetingPassed.time, 'hh:mm a'),
                    location: meetingPassed.location,
                    editNotesFlag: true,
                    meetingID: meetingPassed._id,
                    attendees : meetingPassed.attendees
                });
            }
        }
    }

    saveMeetingNotes = () => {
        let editNotes = this.state.editNotesFlag;
        let meetingID = this.state.meetingID;

        if  (editNotes && meetingID !== '') {
            this.saveMeetingTasks(meetingID, this.state.tasks);
            return;
        }

        // first save the meeting
        axios.post('http://localhost:3000/api/meeting', {
            title : this.state.title,
            date: this.state.date.format('DD-MMM-YYYY'),
            time: this.state.time.format('hh:mm a'),
            location: this.state.location,
            owner: 'niti@niti.com',
            attendees: this.state.attendees,
        }).then((response) => {
            console.log('done saving the meeting:', response.data);

            // let's save the tasks
            let tasks = this.state.tasks;
            let meetingID = response.data['_id'];
            console.log('meeting iD is: ', meetingID);

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

        let url = 'http://localhost:3000/api/tasks';
        axios.post(url, {
            id: meetingID,
            owner: 'niti@niti.com',
            tasks: tasks
        }).then((response) => {    
            console.log('done saving tasks: ', response.data);
            for(let index = 0; index < tasks.length; index++) {
                let originalTask = tasks[index];
                let updatedTask = response.data[index];

                originalTask._id = updatedTask._id;
            }

            console.log('setting final tasks list as: ', tasks);
            this.setState({ tasks : tasks});
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
                                   onAssigneeChange={ (e) => this.updateTask(index, 'due', e) }
                                   attendees={this.state.attendees}  />)
        }

        return result;
    }


    render() {
        return <form >
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingTitle">Meeting Title</label>
                    <input type="text" class="form-control" 
                            id="meetingTitle" placeholder="My Meeting" 
                            onChange={ this.onTitleChange } 
                            value={ this.state.title } 
                            disabled={ this.state.editNotesFlag} />
                </div>
            </div>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingDate">Meeting Date</label>
                    <DatePicker selected={ this.state.date } 
                                onChange={ this.onDateChange } 
                                openToDate={this.state.date } 
                                disabled={ this.state.editNotesFlag}/>
                </div>
                <div class="form-group col">
                    <label for="meetingTime">Meeting Time</label>
                    <DatePicker selected={ this.state.time } 
                                onChange={ this.onTimeChange }
                                showTimeSelect showTimeSelectOnly timeIntervals={ 30 }
                                dateFormat="LT" timeCaption="Time" 
                                value={ this.state.time } 
                                disabled={ this.state.editNotesFlag}/>
                </div>                
                <div class="form-group col">
                    <label for="meetingLocation">Meeting Location</label>
                    <input type="text" class="form-control" id="meetingLocation" 
                        onChange={ this.onLocationChange } 
                        value={ this.state.location }
                        disabled={ this.state.editNotesFlag}
                        />
                </div>                                     
                
            </div>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingAttendees">Meeting Attendees</label>
                    <TagsInput value={ this.state.attendees } 
                               onChange={ this.onAttendeesChange } 
                               disabled={ this.state.editNotesFlag} 
                               inputProps={ { placeholder : 'Email' } }/>
                </div>
            </div>

            <h3>Action Items</h3>
            <div class='action-items'>
                { this.renderTaskDetails() }
            </div>

            <div class='form-row'>
                <div class='form-group col text-right'>
                    <button type="button" className='btn btn-primary' onClick={this.saveMeetingNotes}>Save</button>
                    &nbsp;
                    <button type="button" className='btn btn-success'>Publish</button>
                </div>
            </div>
        </form>;
    }
}

const MNotes = withRouter(CreateNotes);

export default MNotes;