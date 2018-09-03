import * as React from 'react';
import Group from '../component/Group';
import IfClause from '../component/IfClause';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

export default class TaskLists extends React.Component {

    state = {
        loaded: false,
        tasks: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/tasks')
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
            result.push(<tr>
                <td>{ task.topic }</td>
                <td>{ task.level }</td>
                <td>{ task.title }</td>
                <td>{ task.assignee }</td>
                <td>{ moment(task.due).format('DD-MMM-YYYY') }</td>
                <td>{ task.status }</td>
            </tr>);
        }

        return result;
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
