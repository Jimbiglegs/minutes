import * as React from 'react';
import InputTask from '../component/InputTask';
import TaskDetails from '../component/TaskDetails';
import Group from '../component/Group';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

export default class CreateNotes extends React.Component {
    state = {
        tasks: [ new TaskDetails() ],
        title : null,
        date: null,
        time: null,
        attendees: [],
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
        let tasks = this.state.tasks;

        for(let index = 0; index < tasks.length; index++) {
            let task = tasks[index];

            result.push(<InputTask key={ task.taskID } onNextTask={ this.addNextTaskIfNeeded } task={ task } 
                                   onTitleChange={ (e) => this.updateTask(index, 'title', e.target.value) } 
                                   onTopicChange={ (e) => this.updateTask(index, 'topic', e.target.value) } />)
        }

        return result;
    }
    render() {
        return <Group>
            <h3>Create Meeting Notes</h3>
            <form className='container'>
                <div className='form-row'>
                    <div class="form-group col">
                        <label for="meetingTitle">Meeting Title</label>
                        <input type="text" class="form-control" id="meetingTitle" placeholder="My Meeting" onChange={ this.onTitleChange }/>
                    </div>
                </div>
                <div className='form-row'>
                    <div class="form-group col">
                        <label for="meetingDate">Meeting Date</label>
                        <DatePicker selected={ this.state.date } onChange={ this.onDateChange } />
                    </div>
                    <div class="form-group col">
                        <label for="meetingTime">Meeting Time</label>
                        <DatePicker selected={ this.state.time } onChange={ this.onTimeChange }
                                    showTimeSelect showTimeSelectOnly timeIntervals={ 30 }
                                    dateFormat="LT" timeCaption="Time" />
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