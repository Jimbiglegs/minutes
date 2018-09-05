import React,{Component} from 'react';
import Group from '../component/Group';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import Utils from '../Utils';

export default class CreateTeam extends Component {

    state = {
        teamName : null,
        members: [],

        teamNameError: false,
        memberError: false
    }

    onTeamNameChange = (e) => {
        this.setState( { teamName : e.target.value });
    }

    onMembersChange = (members) => {
        this.setState({ members: members });
    }

    //post call
    postTeam = () => {
        const name = this.state.teamName;
        const members = this.state.members;

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

        axios.post('http://localhost:3000/api/team', {
            name : name,
            owner: this.props.profile.profileObj.email,
            members: members
        }).then((data) => {    
          console.log('sending data: ', data);
          this.props.showToast('Team has been added.', 'success');
          this.props.history.push('/home');
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
                        <input type="text" className={ "form-control " + (this.state.teamNameError ? 'is-invalid' : '') } id="teamName" placeholder="Team Name" onChange={ this.onTeamNameChange }/>
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