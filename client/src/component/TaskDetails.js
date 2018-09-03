export default class TaskDetails {

    static counter = 1;

    _id = 'task-' + TaskDetails.counter++;

    meetingID = '';

    topic = '';

    level = 'todo';

    title = '';

    assignee = '';

    owner = '';

    status = 'open';

    due = Date.now();

}
