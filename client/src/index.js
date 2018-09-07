import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import appReducer from './AppStore';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'

const history = createBrowserHistory()

const appStore = createStore(
    connectRouter(history)(appReducer), // new root reducer with router state
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )

ReactDOM.render((
    <Provider store={ appStore }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>
), document.body);

