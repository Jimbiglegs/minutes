import React,{Component} from 'react';
import Group from '../component/Group';
import TeamList from '../containers/TeamList';
import { Link } from 'react-router-dom';

export default class TeamsView extends React.Component {

    render() {
        return <Group>
            <h3>My Teams</h3>

            <div className='row'>
                <div className='col text-right'>
                <Link to='/newTeam' className='btn btn-primary'>Create New Team</Link>
                </div>
            </div>

            <br />

            <TeamList />
        </Group>;
    }

}