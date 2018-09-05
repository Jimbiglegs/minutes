import React, { Component } from 'react';

export default class Toast extends Component {

    render() {
        return <div className={ 'alert alert-' + this.props.level }>
            { this.props.title }
        </div>;
    }

}
