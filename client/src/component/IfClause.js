import * as React from 'react';

export default class IfClause extends React.Component {

    render() {
        if(this.props.condition && this.props.condition === true) {
            return this.props.children;
        }

        return null;
    }

}
