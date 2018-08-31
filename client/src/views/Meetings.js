import * as React from 'react';
import Group from '../component/Group';
import MeetingLists from '../containers/MeetingLists';

export default class Meetings extends React.Component {

    render() {
        return <Group>
            <h3>Upcoming Meetings</h3>

            <MeetingLists />
        </Group>;
    }

}