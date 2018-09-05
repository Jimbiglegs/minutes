import React,{Component} from 'react';
import Group from '../component/Group';
import TeamList from '../containers/TeamList';

export default class CreateTeam extends Component {

    render() {
        return <Group>
            <form className='container-fluid'>
                <div className='form-row'>
                    <div className="form-group col">
                        <label for="meetingTitle">Meeting Title</label>
                        <input type="text" className={ "form-control " + (this.state.titleError ? 'is-invalid' : '') } id="meetingTitle" placeholder="My Meeting" onChange={ this.onTitleChange }/>
                    </div>
                </div>
            </form>   
        </Group>;
    }

}