import * as React from 'react';
import InputTask from '../component/InputTask';
import TaskDetails from '../component/TaskDetails';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tagsinput/react-tagsinput.css'
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Utils from '../Utils';
import MeetingDetails from '../component/MeetingDetails';
import { connect } from 'react-redux';
import * as AllAppActions from './../AppStoreActions';

class CreateNotes extends React.Component {

    componentDidMount() {
        let meetingID = this.props.meeting ? this.props.meeting._id : null;
        if(!meetingID) {
            // clear the form
            console.log('meeting id not found');
            this.props.clearMeeting();
            return;
        }

        // we also need to load data for items
        // that match this meeting
        axios.get('http://localhost:3000/api/meeting/' + meetingID + '/tasks')
            .then((response) => {  
                let tasksOnServer = response.data;
                console.log('tasks for this meeting: ', tasksOnServer);
                if(tasksOnServer.length > 0) {
                    this.props.setActionTasks(tasksOnServer);
                }
            }).catch((error) => {

            });
    }

    saveMeetingNotes = () => {
        // let editNotes = this.state.editNotesFlag;
        // let meetingID = this.state.meetingID;

        // if  (editNotes && meetingID !== '') {
        //     this.saveMeetingTasks(meetingID, this.props.tasks);
        //     return;
        // }

        console.log('save meeting called: ', this.props.meeting);

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

        // // first save the meeting
        // axios.post('http://localhost:3000/api/meeting', {
        //     title : title,
        //     date: date.format('DD-MMM-YYYY'),
        //     time: time.format('hh:mm a'),
        //     location: location,
        //     owner: 'niti@niti.com',
        //     attendees: attendees,
        // }).then((response) => {
        //     console.log('done saving the meeting:', response.data);

        //     // let's save the tasks
        //     let tasks = this.state.tasks;
        //     let meetingID = response.data['_id'];
        //     console.log('meeting iD is: ', meetingID);

        //     for(let index = 0; index < tasks.length; index++) {
        //         tasks[index].meetingID = meetingID;
        //     }
            
        //     this.setState( { meetingID : meetingID, editNotesFlag : true } );
        //     this.saveMeetingTasks(meetingID, tasks);
        // }).catch((err) => {              
        //     console.log('Error retured API in saving new meeting notes:', err);
        // });
    }

    saveMeetingTasks = (meetingID, tasks) => {
        // console.log('saving tasks for id: ', meetingID, tasks);

        // let tasksToSave = [];
        // for(let index = 0; index < tasks.length; index++) {
        //     const task = tasks[index];

        //     if(Utils.isEmpty(task.title) && Utils.isEmpty(task.topic)) {
        //         continue;
        //     }

        //     tasksToSave.push(task);
        // }

        // let url = 'http://localhost:3000/api/tasks';
        // axios.post(url, {
        //     id: meetingID,
        //     owner: 'niti@niti.com',
        //     tasks: tasksToSave
        // }).then((response) => {    
        //     let serverTasks = response.data;
        //     console.log('done saving tasks: ', serverTasks);
            
        //     if(serverTasks.length === 0) {
        //         serverTasks.push(new TaskDetails());
        //     }
            
        //     this.setState({ tasks : serverTasks});

        //     let event = new Event('minutes-toast');
        //     event.title = 'Meeting has been saved.';
        //     event.level = 'success';

        //     document.dispatchEvent(event);
        // }).catch((err) => {              
        //     console.log('Error retured API in saving old meeting notes:', err);
        // });
    }

    addNextTaskIfNeeded = () => {
        let tasks = this.state.tasks;
        tasks.push(new TaskDetails());
        this.setState({ tasks: tasks });
    }

    updateTask = (index, field, value) => {
        let tasks = this.state.tasks;
        let task = tasks[index];
        task[field] = value;

        this.setState({ tasks : tasks });
    }

    renderTaskDetails = () => {
        let result = [];
        let tasks = this.props.tasks;

        for(let index = 0; index < tasks.length; index++) {
            let task = tasks[index];

            result.push(<InputTask key={ task._id } task={ task } />)
        }

        return result;
    }


    render() {
        return <form className='container-fluid'>
            <MeetingDetails />

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

const mapStateToProps = (state) => {   
    return {
        meeting: state.meeting,
        tasks: state.actionTasks
    };
};

export default connect(mapStateToProps, AllAppActions.default)(CreateNotes);
