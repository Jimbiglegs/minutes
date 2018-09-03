import React, { Component } from 'react';
import Header from './containers/Header';
import MyRoutes from './config/Routes';
import Group from './component/Group';
import Footer from './component/Footer';
import ToastContainer from './containers/ToastContainer';

export default class App extends Component {

  state = {
    toasts : [],

    googleProfile : null
  }

  componentDidMount() {
    document.addEventListener('minutes-toast', this.showToast);
  }

  componentWillUnmount() {
    document.removeEventListener('minutes-toast', this.showToast);
  }

  setGoogleProfile = (profile) => {
    this.setState( { googleProfile : profile });
    console.log('google user object: ', profile);
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
            <Header className="page-header" 
                    onGoogleAuth={ (profile) => this.setGoogleProfile(profile) } 
                    profile={ this.state.googleProfile } />
                    
            <main className="page-body">
              <MyRoutes/>
            </main>
            <Footer />
            <ToastContainer toasts={ this.state.toasts } />
          </Group>
        
    );
  }
}


