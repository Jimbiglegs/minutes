import React, { Component } from 'react';
import Header from './containers/Header';
import MyRoutes from './config/Routes';
import Group from './component/Group';
import Footer from './component/Footer';
import ToastContainer from './containers/ToastContainer';
import { connect } from 'react-redux';

class App extends Component {

    render() {
        return (
            <Group>
                <Header className="page-header" />
                <main className="page-body">
                    <MyRoutes />
                </main>
                <Footer />
                <ToastContainer toasts={this.props.toasts} />
            </Group>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        toasts: state.toasts
    };
}

export default connect(mapStateToProps)(App);
