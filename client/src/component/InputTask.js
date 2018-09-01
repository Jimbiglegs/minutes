import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

export default class InputTask extends Component {

    state = {
        date: null,
        taskLevel: null,
    }

    detectTabKey = (event) => {
        
        let keyCode = event.keyCode;
        if(keyCode === 9 && !event.shiftKey) {
            this.props.onNextTask();
        }
    }

    populateAttendeesList = () => {
        let results = [];
        let attendeesList = this.props.attendees;
        for (let i=0; i< attendeesList.length ; i++) {
            let item = attendeesList[i];
            results.push
            (<option>{ item }</option>)
        }
        return results;
    }

    onDateChange = (e) => {
        this.setState( { date : e });
    }

    onTaskLevelChange = (e) => {
        this.setState( { taskLevel : e.target.value });
        console.log(this.state.taskLevel);
    }

    render() {
        return <div className={'form-row task-level-' + this.state.taskLevel}>
            <div className="form-group col-md-1">
                <input type="text" class="form-control" name="taskTopic" 
                       placeholder="Add Topic" onChange={ this.props.onTopicChange } />
            </div>
            <div className='form-group col-md-1'>
                <select class="custom-select mb-3" name='taskType' onChange={ this.onTaskLevelChange }>
                    <option value="agenda">Agenda</option>
                    <option value="decision">Decision</option>
                    <option value="done">Done</option>
                    <option value="info">Info</option>
                    <option value="idea">Idea</option>
                    <option value="todo">Todo</option>
                </select>
            </div>
            <div className="form-group col">
                <input type="text" class="form-control" name="taskTitle" placeholder="Note" 
                       value={ this.props.task.title } onChange={ this.props.onTitleChange }/>
            </div>
            <div className="form-group col-md-1">
                <select>
                     { this.populateAttendeesList() }
                </select> 
            </div>
            <div className="form-group col-md-1">
                <DatePicker placeholderText="Date" selected={ this.state.date } onChange={ this.onDateChange } onKeyDown={ this.detectTabKey } />
            </div>
        </div>;
    }

}
