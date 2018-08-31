import * as React from 'react';

export default class InputTask extends React.Component {

    detectTabKey = (event) => {
        
        let keyCode = event.keyCode;
        if(keyCode === 9 && !event.shiftKey) {
            this.props.onNextTask();
        }
    }

    render() {
        return <div className='form-row'>
            <div className="form-group col-md-1">
                <input type="text" class="form-control" name="taskTopic" 
                       placeholder="Add Topic" onChange={ this.props.onTopicChange } />
            </div>
            <div className='form-group col-md-1'>
                <select class="custom-select mb-3" name='taskType'>
                    <option value="agenda">Agenda</option>
                    <option value="decision">Decision</option>
                    <option value="done">Done</option>
                    <option value="info">Info</option>
                    <option value="idea">Idea</option>
                    <option value="todo">Todo</option>
                </select>
            </div>
            <div className="form-group col">
                <input type="text" class="form-control" name="taskTitle" placeholder="Note" 
                       value={ this.props.task.title } onChange={ this.props.onTitleChange }/>
            </div>
            <div className="form-group col-md-1">
                <input type="text" class="form-control" name="taskOwner" placeholder="Owner" />
            </div>
            <div className="form-group col-md-1">
                <input type="text" class="form-control" name="taskDue" placeholder="2018-09-29" onKeyDown={ this.detectTabKey } />
            </div>
        </div>;
    }

}
