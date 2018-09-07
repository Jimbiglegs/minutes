import * as React from 'react';
import Group from '../component/Group';
import TaskLists from '../containers/TaskLists';

export default class TaskView extends React.Component {

    render() {
        return <Group>
            <h3>Your Tasks</h3>

            <TaskLists showButtons={true} />
        </Group>;
    }

}
