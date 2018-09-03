import React, { Component } from 'react';
import Header from './containers/Header';
// import Landing from './views/Landing';
import MyRoutes from './config/Routes';
import Group from './component/Group';
import Footer from './component/Footer';
import ToastContainer from './containers/ToastContainer';

export default class App extends Component {

  state = {
    toasts : []
  }

  componentDidMount() {
    document.addEventListener('minutes-toast', this.showToast);
  }

  componentWillUnmount() {
    document.removeEventListener('minutes-toast', this.showToast);
  }

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
            <Header className="page-header"/>            
            <main className="page-body">
              <MyRoutes/>
            </main>
            <Footer />
            <ToastContainer toasts={ this.state.toasts } />
          </Group>
        
    );
  }
}


