import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tagsinput/react-tagsinput.css'
import moment from 'moment';

export default class InputTask extends Component {

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

    render() {
        return <div className={'form-row task-level-' + this.props.task.level}>
            <div className="form-group col-md-1">
                <input type="text" className="form-control" name="taskTopic" 
                       placeholder="Add Topic" onChange={ this.props.onTopicChange } />
            </div>
            <div className='form-group col-md-1'>
                <select className="custom-select mb-3" name='taskType' onChange={ this.props.onTaskLevelChange }>
                    <option value="agenda">Agenda</option>
                    <option value="decision">Decision</option>
                    <option value="done">Done</option>
                    <option value="info">Info</option>
                    <option value="idea">Idea</option>
                    <option value="todo">Todo</option>
                </select>
            </div>
            <div className="form-group col">
                <input type="text" className="form-control" name="taskTitle" placeholder="Note" 
                       value={ this.props.task.title } onChange={ this.props.onTitleChange }/>
            </div>
            <div className="form-group col-md-1">
                <select className='custom-select mb-3' onChange={ this.props.onAssigneeChange } >
                     { this.populateAttendeesList() }
                </select> 
            </div>
            <div className="form-group col-md-2 date-picker-col">
                <DatePicker placeholderText="Date" 
                            selected={ moment(this.props.task.due) } 
                            onChange={ this.props.onDateChange } 
                            onKeyDown={ this.detectTabKey } 
                            minDate={moment()} />
            </div>
        </div>;
    }

}
