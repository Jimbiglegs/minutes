import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as AppStoreActions from './../AppStoreActions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Group from '../component/Group';
import IfClause from '../component/IfClause';

class TeamList extends Component {

    state = {
        loaded: false,
        teams: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/teams?owner=' + this.props.profile.profileObj.email)
            .then((response) => {
                console.log('teams retrieved from database : ', response)
                this.setState({ teams : response.data, loaded : true });
            }).catch((e) => {
                console.log('error fetching meetings', e);
                this.props.showToast('Unable to load team list', 'danger');
            });    
    }

    deleteTeam = (team) => {
        if(!team) {
            return;
        }

        let confirmed = window.confirm('Do you really want to delete the team?');
        if(!confirmed) {
            return;
        }

        axios.delete('http://localhost:3000/api/team/' + team._id + '?owner=' + this.props.profile.profileObj.email)
            .then((response) => {
                this.props.showToast('Team has been deleted', 'success');

                // remove team from UI
                let filtered = this.state.teams.filter( e => e._id !== team._id);
                this.setState( { teams : filtered });
            }).catch((e) => {
                console.log('error removing team', e);
                this.props.showToast('Unable to delete team', 'danger');
            });
    }

    getTeamsAsRows = () => {
        let teams = this.state.teams;
        let result = [];
        for(let index = 0; index < teams.length; index++) {
            let team = teams[index];

            result.push(<tr key='team._id'>
                <td>
                    { team.name }
                </td>
                <td>
                    { team.members.join(', ') }
                </td>
                <td>
                    <button className='btn btn-orange' 
                            data-balloon="Delete team" 
                            data-balloon-pos="up"
                            onClick={ e => this.deleteTeam(team) }>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>);
        }

        return result;
    }
    
    render() {
        return <Group>
            <IfClause condition={ !this.state.loaded }>
                Loading team list...
            </IfClause>
            <IfClause condition={ this.state.loaded }>
                <IfClause condition={ !(this.state.teams && this.state.teams.length > 0) }>
                    <div className='alert alert-info'>
                        No teams are yet available.
                    </div>
                </IfClause>
                <IfClause condition={ this.state.teams && this.state.teams.length > 0 }>
                    <table className='table table-striped table-sm'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Members</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.getTeamsAsRows() }
                        </tbody>
                    </table>
                </IfClause>
            </IfClause>
        </Group>;
    }

}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    };
}
  
export default connect(mapStateToProps, AppStoreActions.default)(withRouter(TeamList));
