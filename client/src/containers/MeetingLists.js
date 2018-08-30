import * as React from 'react';
import Group from '../component/Group';
import IfClause from '../component/IfClause';

export default class MeetingList extends React.Component {

    state = {
        loaded: false,
        meetings: []
    }

    setData = () => {
        let meetings = [
            {
                title : 'Finalize user stories',
                day: '28 Aug 2018',
                time: '11:00 AM',
                location: 'epitome hall,san jose'
            },
            {
                title : 'Discuss ERD',
                day: '28 Aug 2018',
                time: '1:00 PM',
                location: 'epitome hall,san jose'
            }
        ];

        this.setState( { loaded : true, meetings : meetings });
    }

    componentDidMount() {
        setTimeout(this.setData, 1000);
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
                <td>{ meeting.locality }</td>
            </tr>);
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
