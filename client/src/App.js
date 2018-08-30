import React, { Component } from 'react';
import Header from './containers/Header';
// import Landing from './views/Landing';
import MyRoutes from './config/Routes';
import Group from './component/Group';
import Footer from './component/Footer';

export default class App extends Component {
  render() {
    return (
          <Group>
            <Header className="page-header"/>            
            <main className="page-body">
              <MyRoutes/>
            </main>
            <Footer />
          </Group>
        
    );
  }
}


