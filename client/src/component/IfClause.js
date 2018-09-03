import React, {Component} from 'react';

export default class IfClause extends Component {

    render() {
        if(this.props.condition) {
            return this.props.children;
        }

        return null;
    }

}
