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

class CreateNotes extends React.Component {
    state = {
        tasks: [ new TaskDetails() ],
        title : null,
        date: null,
        time: null,
        location:null,
        attendees: [],
        editNotesFlag: false,
    }

    componentDidMount() {
        if(this.props.location && this.props.location.state) {
            let meetingPassed = this.props.location.state.meeting;
            console.log('meeting passed via router: ', meetingPassed);
            if(meetingPassed) {
                console.log('change state: ' + meetingPassed.title);
                this.setState({ 
                    title : meetingPassed.title,
                    date: moment(meetingPassed.date),
                    time: meetingPassed.time,
                    location: meetingPassed.location,
                    editNotesFlag: true
                });
            }
        }
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

            result.push(<InputTask key={ task.taskID } onNextTask={ this.addNextTaskIfNeeded } task={ task } 
                                   onTitleChange={ (e) => this.updateTask(index, 'title', e.target.value) } 
                                   onTopicChange={ (e) => this.updateTask(index, 'topic', e.target.value) }
                                   attendees={this.state.attendees}  />)
        }

        return result;
    }
    render() {
        return <Group>
            <form className='container'>
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
                                    openToDate={this.state.date} 
                                    disabled={ this.state.editNotesFlag}/>
                    </div>
                    <div class="form-group col">
                        <label for="meetingTime">Meeting Time</label>
                        <DatePicker selected={ this.state.time } onChange={ this.onTimeChange }
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
                        <TagsInput value={ this.state.attendees } onChange={ this.onAttendeesChange } />
                    </div>
                </div>

                <h3>Action Items</h3>
                
                { this.renderTaskDetails() }

                <div class='form-row'>
                    <div class='form-group col text-right'>
                        <button type="button" className='btn btn-primary'>Save</button>
                        &nbsp;
                        <button type="button" className='btn btn-success'>Publish</button>
                    </div>
                </div>
            </form>
        </Group>;
    }
}

const MNotes = withRouter(CreateNotes);

export default MNotes;