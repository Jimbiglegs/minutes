import React, { Component } from 'react';

import Header from './containers/Header';
import Group from './component/Group';
import Footer from './component/Footer';
import ToastContainer from './containers/ToastContainer';
import AppRoutes from './config/Routes';

import { connect } from 'react-redux';

class App extends Component {

    componentDidMount() {
        let json = localStorage.getItem('profile');
        if(!json) {
            console.log('no json');
            return;
        }

        let profile = JSON.parse(json);
        if(!profile) {
            console.log('no profile');
            return;
        }

        console.log('profile read as: ', profile);
        this.props.dispatch({
            type : 'SET_PROFILE',
            profile : profile
        });
    }

    render() {
        return  <Group>
            <Header className="page-header" />
            <main className="page-body">
                <AppRoutes />
            </main>
            <Footer />
            <ToastContainer toasts={this.props.toasts} />
        </Group>;
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        toasts: state.toasts,
        location: state.router.location.pathname
    };
}

export default connect(mapStateToProps)(App);
