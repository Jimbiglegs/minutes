import React, { Component } from 'react';
import Header from './containers/Header';
import MyRoutes from './config/Routes';
import Group from './component/Group';
import Footer from './component/Footer';
import ToastContainer from './containers/ToastContainer';
import { connect } from 'react-redux';

class App extends Component {

    componentDidMount() {
        let json = localStorage.getItem('profile');
        if(json) {
            let profile = JSON.parse(json);
            if(profile) {
                this.props.dispatch({
                    type: 'SET_PROFILE',
                    profile: profile
                });
            }
        }
    }

  render() {
    return (
          <Group>
            <Header className="page-header" />
            <main className="page-body">
              <MyRoutes/>
            </main>
            <Footer />
            <ToastContainer toasts={ this.props.toasts } />
          </Group>
        
    );
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
