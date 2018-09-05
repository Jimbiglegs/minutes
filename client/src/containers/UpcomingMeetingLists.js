import React, {Component} from 'react';
import Group from '../component/Group';
import IfClause from '../component/IfClause';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class UpcomingMeetingList extends Component{

    state = {
        loaded: false,
        meetings: []
    }

    componentDidMount() {
        let url = 'http://localhost:3000/api/meetings';

        axios.get(url)
        .then((response) => {
            console.log('Meetings retrieved from database : ', response)
            this.setState({ meetings : response.data, loaded : true });
        }).catch((e) => {
            console.log('error fetching meetings', e);
        });    
    }

    getMeetingsAsTableRows = () => {
        
        let meetings = this.state.meetings;
        let result = [];
        for(let index = 0; index < meetings.length; index++) {
            let meeting = meetings[index];
            result.push(<tr>
                <td>{ meeting.title }</td>
                <td>{ meeting.day }</td>
                <td>{ meeting.time }</td>
                <td>{ meeting.location }</td> 
                <td>
                    <button class='btn btn-primary' onClick={ (e) => { this.editMeeting(meeting) } }>Edit Meeting</button>
                </td>
                </tr>
                );
            
        }

        return result;
    }

    editMeeting = (meeting) => {
        this.props.history.push( {
            pathname : '/createNotes',
            state : {
                meeting: meeting
            }
        });
    }

    render() {
        return <Group>
            <IfClause condition={ this.state.loaded }>
                <IfClause condition={ this.state.meetings.length == 0 }>
                    <div className='alert alert-info'>
                        No upcoming meetings.
                    </div>
                </IfClause>
                <IfClause condition={ this.state.meetings.length > 0 }>
                    <table className='table table-striped table-sm'>
                        <tbody>
                         { this.getMeetingsAsTableRows() }
                         
                        </tbody>
                    </table>
                </IfClause>
            </IfClause>
            <IfClause condition={ !this.state.loaded }>
            Fetching meetings list...
            </IfClause>
        </Group>;
    }

}

const Upcoming = withRouter(UpcomingMeetingList);

export default Upcoming;
