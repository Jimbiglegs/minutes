import React,{Component} from 'react';
import Group from '../component/Group';
import IfClause from '../component/IfClause';
import axios from 'axios';
import moment from 'moment';
import Utils from '../Utils';
import { connect } from 'react-redux';
import * as AppStoreActions from './../AppStoreActions';
import { withRouter } from 'react-router-dom';

class TaskLists extends Component {

    state = {
        loaded: false,
        tasks: []
    }

    componentDidMount() {
        axios.get('https://minutes-api.herokuapp.com/api/tasks?owner=' + this.props.profile.profileObj.email)
            .then((response) => {
                console.log('Tasks retrieved from database : ', response)
                this.setState({ tasks : response.data, loaded : true });
            }).catch((e) => {
                console.log('error fetching meetings', e);
            });    
    }

    getTasksAsTableRows = () => {
        let tasks = this.state.tasks;
        let result = [];
        for(let index = 0; index < tasks.length; index++) {
            let task = tasks[index];
            result.push(<tr key={ task._id }>
                <td>{ task.topic }</td>
                <td>{ task.level }</td>
                <td>{ task.title }</td>
                <td>{ task.assignee }</td>
                <td>{ moment(task.due).format('DD-MMM-YYYY') }</td>
                <td>{ task.status }</td>
                <td>
                    <IfClause condition={ this.props.showButtons === true }>
                        <IfClause condition={ 'done' !== task.status}>
                            <button className='btn btn-warning btn-sm mx-1' onClick={ (e) => this.changeTaskStatus(task, 'done') } data-balloon="Task Done" data-balloon-pos="up">
                            <i className="fas fa-clipboard-check"></i>
                            </button>
                            
                            <IfClause condition={ 'onhold' !== task.status && 'blocked' !== task.status }>
                                <button className='btn btn-warning btn-sm mx-1' onClick={ (e) => this.changeTaskStatus(task, 'onhold') } data-balloon="On Hold" data-balloon-pos="up">
                                 <i className="fas fa-child"></i>
                                </button>
                            </IfClause>
                            
                            <IfClause condition={ 'blocked' !== task.status }>
                                <button className='btn btn-danger btn-sm mx-1' onClick={ (e) => this.changeTaskStatus(task, 'blocked') } data-balloon="Task Blocked" data-balloon-pos="up">
                                <i className="fas fa-user-lock"></i>
                                </button>
                            </IfClause>
                            
                            <IfClause condition={ 'blocked' === task.status }>
                                <button className='btn btn-primary btn-sm mx-1' onClick={ (e) => this.changeTaskStatus(task, 'open') } data-balloon="Task Re-Open" data-balloon-pos="up">
                                  <i className="fas fa-lock-open"></i>
                                </button>
                            </IfClause>
                        </IfClause>
                        <IfClause condition={ 'done' === task.status}>
                            <button className='btn btn-danger btn-sm mx-1' onClick={ (e) => this.changeTaskStatus(task, 'open') } data-balloon="Task Re-Open" data-balloon-pos="up">
                              <i className="fas fa-lock-open"></i>
                            </button>
                        </IfClause>
                    </IfClause>
                </td>
            </tr>);
        }

        return result;
    }

    changeTaskStatus = (task, status) => {
        // first save the meeting
        axios.post('https://minutes-api.herokuapp.com/api/task/' + task._id + '/status', {
            status : status,
            taskID: task._id,
            owner: this.props.profile.profileObj.email
        }).then((response) => {
            console.log('done saving the meeting:', response.data);
            Utils.success('Task status updated');
            let tasks = this.state.tasks;
            let index = tasks.indexOf(task);
            task.status = status;
            tasks[index] = task;
            this.setState( { tasks : tasks });
        }).catch((err) => {              
            console.log('Error retured API in changing status of task:', err);
            Utils.error('Unable to update task status');
        });
    }


    render() {
        return <Group>
            <IfClause condition={ this.state.loaded }>
                <IfClause condition={ this.state.tasks.length == 0 }>
                    <div className='alert alert-info'>
                        No action items are assigned yet. Hurray!
                    </div>
                </IfClause>
                <IfClause condition={ this.state.tasks.length > 0 }>
                    <table className='table table-striped table-sm'>
                        <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Assignee</th>
                                <th>Due</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                         { this.getTasksAsTableRows() }
                        </tbody>
                    </table>
                </IfClause>
            </IfClause>
            <IfClause condition={ !this.state.loaded }>
            Fetching task list...
            </IfClause>
        </Group>;
    }

}

const mapStateToProps = (state) => {
    return {
      profile: state.profile
    };
}
  
export default connect(mapStateToProps, AppStoreActions.default)(withRouter(TaskLists));
