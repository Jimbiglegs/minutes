import React,{Component} from 'react';
import Group from '../component/Group';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import Utils from '../Utils';
import { connect } from 'react-redux';
import * as AppStoreActions from './../AppStoreActions';
import { withRouter } from 'react-router-dom';

class CreateTeam extends Component {

    state = {
        teamName : null,
        slack: null,
        members: [],

        teamNameError: false,
        memberError: false
    }

    onTeamNameChange = (e) => {
        this.setState( { teamName : e.target.value });
    }

    onSlackChange = (e) => {
        this.setState( { slack : e.target.value });
    }

    onMembersChange = (members) => {
        this.setState({ members: members });
    }

    //post call
    postTeam = () => {
        const name = this.state.teamName;
        const members = this.state.members;
        const slack = this.state.slack;

        // reset all errors to false
        this.setState({
            teamNameError: false,
            membersError: false
        });
        
        // start validation
        if(Utils.isEmpty(name)){
            this.props.showToast('Team Name required', 'danger');
            this.setState({ teamNameError : true });
            return;
        }

        if(Utils.isEmpty(members)) {
            this.props.showToast('Team Members are required', 'danger');
            this.setState({ membersError : true });
            return;
        }

        for(let eindex = 0; eindex < members.length; eindex++) {
            let em = members[eindex];

            if(!Utils.validateEmail(em)) {
                this.props.showToast('Not a valid email address: ' + em, 'danger');
                this.setState({ membersError : true });
                return;
            }
        }

        axios.post('http://localhost:3000/api/team', {
            name : name,
            owner: this.props.profile.profileObj.email,
            slack: slack,
            members: members
        }).then((data) => {    
          console.log('sending data: ', data);
          this.props.showToast('Team has been added.', 'success');
          this.props.history.push('/teams');
        }).catch((err) => {              
            console.log('Error retured API in adding Team:', err);
            this.props.showToast('Unable to add team..', 'danger')
        });
    }      
    
    render() {
        return <Group>
            <form className='container-fluid'>
                <div className='form-row'>
                    <div className="form-group col">
                        <label for="teamName">Team Name</label>
                        <input type="text" 
                               className={ "form-control " + (this.state.teamNameError ? 'is-invalid' : '') } id="teamName" 
                               placeholder="Team Name" 
                               autocomplete='off'
                               onChange={ this.onTeamNameChange }
                               />
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group col">
                        <label for="slackChannel">Slack Channel</label>
                        <input type="text" 
                               className={ "form-control " + (this.state.slackError ? 'is-invalid' : '') } 
                               placeholder="Slack Channel" onChange={ this.onSlackChange }/>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group col">
                        <label for="teamMembers">Team Members</label>
                        <TagsInput value={ this.state.members }
                                   className={ 'react-tagsinput ' + (this.state.membersError ? 'is-invalid' : '') }
                                   onChange={ this.onMembersChange } />
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group col text-right'>
                        <button type="button" className='btn btn-primary' onClick={this.postTeam}>Add New Team</button>
                    </div>
                </div>
            </form>
        </Group>;
    }

}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      toasts: state.toasts
    };
}
  
export default connect(mapStateToProps, AppStoreActions.default)(withRouter(CreateTeam));
