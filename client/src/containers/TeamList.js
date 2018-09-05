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
    
    render() {
        return <Group>
            <IfClause condition={ !this.state.loaded }>
                Loading team list...
            </IfClause>
            <IfClause condition={ this.state.loaded }>
                <IfClause condition={ !(this.state.team && this.state.teams.length > 0) }>
                    <div class='alert alert-info'>
                        No teams are yet available.
                    </div>
                </IfClause>
                <IfClause condition={ this.state.team && this.state.teams.length > 0 }>
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
