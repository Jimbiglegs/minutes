import * as React from 'react';
import Group from '../component/Group';
import TeamList from '../containers/TeamList';

export default class TeamsView extends React.Component {

    render() {
        return <Group>
            <h3>My Teams</h3>

            <TeamList />
        </Group>;
    }

}