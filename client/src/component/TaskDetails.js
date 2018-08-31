export default class TaskDetails {

    static counter = 1;

    taskID = 'task-' + TaskDetails.counter++;

    topic = '';

    type = 'todo';

    title = '';

    owner = '';

    due = Date.now();

}
