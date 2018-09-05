import React,{Component} from 'react';
import Group from '../component/Group';

export default class CreateTeam extends Component {

    state = {
        teamName : null,
        members: [],

        teamNameError: false,
        memberError: false
    }

    onTeamNameChange = (e) => {
        this.setState( { title : e.target.value });
    }

    onMembersChange = (members) => {
        this.setState({ members: members });
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
                        <button type="button" className='btn btn-primary' onClick={this.postSchedule}>Add New Team</button>
                    </div>
                </div>
            </form>
        </Group>;
    }

}