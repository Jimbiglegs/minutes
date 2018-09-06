import * as React from 'react';
import Group from '../component/Group';
import TaskLists from '../containers/TaskLists';
import IfClause from '../component/IfClause';

export default class TaskView extends React.Component {

    state = {
        completed : false
    }

    setShowCompleted = (bool) => {
        this.setState( { completed : bool });
    }

    render() {
        return <Group>
            <h3>Your Tasks</h3>

            <div className='row'>
                <div className='col text-right'>
                    <IfClause condition={ !this.state.completed }>
                        <button className='btn btn-primary' onClick={ () => this.setShowCompleted(true) }>Show Completed</button>
                    </IfClause>
                    <IfClause condition={ this.state.completed }>
                        <button className='btn btn-primary' onClick={ () => this.setShowCompleted(false) }>Show Open</button>
                    </IfClause>
                </div>
            </div>

            <br />
            
            <TaskLists showButtons={true} />
        </Group>;
    }

}
