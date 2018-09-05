import React, { Component } from 'react';
import Toast from '../component/Toast';
import { connect } from 'react-redux';

class ToastContainer extends Component {

    getToasts = () => {
        let result = [];

        console.log(this.props);

        for(let index = 0; index < this.props.toasts.length; index++) {
            let toast = this.props.toasts[index];
            if(!toast) {
                continue;
            }

            result.push(<Toast title={ toast.title } level={ toast.level } />);
        }

        return result;
    }

    render() {
        if(this.props.toasts.length == 0) {
            return null;
        }

        return <div className='toast-container'>
            { this.getToasts() }
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      toasts: state.toasts
    };
}
  
export default connect(mapStateToProps)(ToastContainer);