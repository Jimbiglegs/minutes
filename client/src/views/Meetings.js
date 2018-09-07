import * as React from 'react';
import Group from '../component/Group';
import UpcomingMeetingLists from '../containers/UpcomingMeetingLists';

export default class Meetings extends React.Component {

    render() {
        return <Group>
            <h3>My Meetings</h3>

            <UpcomingMeetingLists showGrouped={ true } />
        </Group>;
    }

}