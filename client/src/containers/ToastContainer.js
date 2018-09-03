import React, { Component } from 'react';
import Toast from '../component/Toast';

export default class ToastContainer extends Component {

    getToasts = () => {
        let result = [];

        for(let index = 0; index < this.props.toasts.length; index++) {
            let toast = this.props.toasts[index];

            result.push(<Toast title={ toast.title } level={ toast.level } />);
        }

        return result;
    }

    render() {
        if(this.props.toasts.length == 0) {
            return null;
        }

        return <div class='toast-container'>
            { this.getToasts() }
        </div>;
    }
}