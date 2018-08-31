import * as React from 'react';
import InputTask from '../component/InputTask';
import TaskDetails from '../component/TaskDetails';

export default class CreateNotes extends React.Component {
    state = {
        tasks: [ new TaskDetails() ],
        title : null,
        date: null,
        time: null
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
        return <form className='container'>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingTitle">Meeting Title</label>
                    <input type="email" class="form-control" id="meetingTitle" placeholder="My Meeting" />
                </div>
            </div>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingDate">Meeting Date</label>
                    <input type="email" class="form-control" id="meetingDate" placeholder="Date" />
                </div>
                <div class="form-group col">
                    <label for="meetingTime">Meeting Time</label>
                    <input type="email" class="form-control" id="meetingTime" placeholder="Time" />
                </div>
            </div>
            <div className='form-row'>
                <div class="form-group col">
                    <label for="meetingAttendees">Meeting Attendees</label>
                    <select class="custom-select mb-3" id='meetingAttendees'>
                        <option selected>Attendees</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
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
        </form>;
    }
}