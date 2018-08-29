import React, { Component }from 'react';
import {Switch, Route} from 'react-router-dom';
import  Landing from '../views/Landing';
import { withRouter } from 'react-router-dom';

class Routes extends Component{

    render() {
        return <Switch>

                    <Route exact path="/" component={ Landing } />

                    <Route exact path="/home" component={ homepage } />

                </Switch>

    }
}

const MyRoutes = withRouter(Routes);

export default MyRoutes;