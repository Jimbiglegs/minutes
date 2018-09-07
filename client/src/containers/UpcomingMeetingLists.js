import React, {Component} from 'react';
import Group from '../component/Group';
import IfClause from '../component/IfClause';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

class UpcomingMeetingList extends Component{

    state = {
        loaded: false,
        meetings: []
    }

    componentDidMount() {
        let url = 'https://minutes.herokuapp.com/api/meetings';

        axios.get(url)
        .then((response) => {
            console.log('Meetings retrieved from database : ', response)
            this.setState({ meetings : response.data, loaded : true });
        }).catch((e) => {
            console.log('error fetching meetings', e);
        });    
    }

    getMeetingsAsTableRows = (meetings) => {
        let result = [];
        const today = moment().startOf('day').valueOf();
        for(let index = 0; index < meetings.length; index++) {
            let meeting = meetings[index];

            if(this.props.onlyUpcoming) {
                // check if meeting falls in next 7 days
                let millis = moment(meeting.day);
                let remaining = millis - today;
                if(!(remaining < SEVEN_DAYS)) {
                    continue;
                }
            }

            result.push(<tr key={ meeting._id }>
                <td>{ meeting.title }</td>
                <td>{ meeting.day }</td>
                <td>{ meeting.time }</td>
                <td>{ meeting.location }</td> 
                <td className='text-right'>
                    <IfClause condition={ !meeting.published }>
                        <button className='btn btn-orange btn-sm mx-1' data-balloon="Edit Notes" data-balloon-pos="up"
                                onClick={ (e) => { this.takeNotes(meeting) } }>                   
                                <i className="fas fa-edit" ></i>
                                </button>
                                
                        <button className='btn btn-orange btn-sm mx-1' data-balloon="Edit Meeting" data-balloon-pos="up"
                                onClick={ (e) => { this.editMeeting(meeting) } }>
                                <i className="fas fa-calendar-alt"></i>
                                </button>
                    </IfClause>
                </td>
                </tr>
                );
            
        }

        return result;
    }

    editMeeting = (meeting) => {
        this.props.history.push( {
            pathname : '/editMeeting',
            state : {
                meeting: meeting
            }
        });
    }

    takeNotes = (meeting) => {
        this.props.history.push( {
            pathname : '/createNotes',
            state : {
                meeting: meeting
            }
        });
    }

    // filtering old meeting based on published field
    filterOld = (meetings) => {
        let result = [];
        for(let index = 0; index < meetings.length; index++) {
            let meeting = meetings[index];
            if(meeting.published) {
                result.push(meeting);
            }
        }

        return result;
    }

    filterNew = (meetings) => {
        let result = [];
        for(let index = 0; index < meetings.length; index++) {
            let meeting = meetings[index];
            if(!meeting.published) {
                result.push(meeting);
            }
        }

        return result;
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
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>On</th>
                                <th>At</th>
                                <th>Location</th>
                                <th className='text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <IfClause condition={ !this.props.showGrouped }>
                                { this.getMeetingsAsTableRows(this.state.meetings) }
                            </IfClause>
                            <IfClause condition={ this.props.showGrouped }>
                                <tr className='table-success'>
                                    <td colspan='5'>Upcoming Meetings</td>
                                </tr>
                                { this.getMeetingsAsTableRows(this.filterNew(this.state.meetings)) }
                                <tr className='table-warning'>
                                    <td colspan='5'>Old Meetings</td>
                                </tr>
                                { this.getMeetingsAsTableRows(this.filterOld(this.state.meetings)) }
                            </IfClause>
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
