import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tagsinput/react-tagsinput.css'
import moment from 'moment';
import { connect } from 'react-redux';
import * as AllAppActions from './../AppStoreActions';

class InputTask extends Component {

    detectTabKey = (event) => {
        let keyCode = event.keyCode;
        if(keyCode === 9 && !event.shiftKey) {
            // are we the last task in tasks
            let index = this.props.allTasks.indexOf(this.props.task);
            if(this.props.allTasks.length === (index + 1)) {
                this.props.addNewActionTask();
            }
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

    updateField = (task, field, value) => {
        this.props.updateTaskField(task, field, value);
    }

    render() {
        return <div className={'form-row task-level-' + this.props.task.level}>
            <div className="form-group col-md-1">
                <input type="text" class="form-control" name="taskTopic" 
                       placeholder="Add Topic" 
                       onChange={ (e) => this.updateField(this.props.task, 'topic', e.target.value) } />
            </div>
            <div className='form-group col-md-1'>
                <select class="custom-select mb-3" name='taskType' 
                        onChange={ (e) => this.updateField(this.props.task, 'level', e.target.value) } >
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
                       value={ this.props.task.title } 
                       onChange={ (e) => this.updateField(this.props.task, 'title', e.target.value) } />
            </div>
            <div className="form-group col-md-1">
                <select className='custom-select mb-3'
                        onChange={ (e) => this.updateField(this.props.task, 'assignee', e.target.value) } >
                     { this.populateAttendeesList() }
                </select> 
            </div>
            <div className="form-group col-md-2 date-picker-col">
                <DatePicker placeholderText="Date" selected={ moment(this.props.task.due) } 
                    onChange={ (e) => this.updateField(this.props.task, 'due', e) }
                    onKeyDown={ this.detectTabKey } />
            </div>
        </div>;
    }

}

const mapStateToProps = (state) => {   
    return {
        allTasks: state.actionTasks,
        attendees: state.meeting.attendees
    };
};

export default connect(mapStateToProps, AllAppActions.default)(InputTask);
