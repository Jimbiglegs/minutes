import React, { Component } from 'react';
import Header from './containers/Header';
import Landing from './views/Landing';
import MyRoutes from './config/Routes';
import Group from './component/Group';
import Footer from './component/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {


  render() {
    return (
        <BrowserRouter>
        <Group>
          <Header/>
          
          <main>
            <MyRoutes/>
          </main>
          <Footer />
           </Group>
        </BrowserRouter>
        
    );
  }
}


