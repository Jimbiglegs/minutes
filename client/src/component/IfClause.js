import * as React from 'react';

export default class IfClause extends React.Component {

    render() {
        if(this.props.condition) {
            return this.props.children;
        }

        return null;
    }

}
