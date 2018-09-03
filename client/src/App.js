import React, { Component } from 'react';
import Header from './containers/Header';
import MyRoutes from './config/Routes';
import Group from './component/Group';
import Footer from './component/Footer';
import ToastContainer from './containers/ToastContainer';
import { connect } from 'react-redux';

class App extends Component {

  showToast = (e) => {
    if(!e) {
      return;
    }

    let toast = { title : e.title, level: e.level };
    let toasts = this.state.toasts;
    toasts.push(toast);
    this.setState({ toasts: toasts });

    // settimer to hide this toast after 5 seconds
    setTimeout(() => {
      let ts = this.state.toasts;
      let index = ts.indexOf(toast);
      ts.splice(index, 1);
      this.setState({ toasts : ts });
    }, 5000);
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
    toasts: state.toasts
  };
}

export default connect(mapStateToProps)(App);
