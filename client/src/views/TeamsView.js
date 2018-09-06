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
                <Link to='/newTeam' className='btn btn-orange' data-balloon="Create New Team" data-balloon-pos="left">
                <i className="fas fa-user-plus faa-pulse animated">
                </i>
                </Link>
                </div>
            </div>

            <br />

            <TeamList />
        </Group>;
    }

}