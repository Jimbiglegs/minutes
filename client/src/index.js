import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, ConnectedRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './AppStore';

const appStore = createStore(appReducer)

ReactDOM.render((
    <Provider store={ appStore }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.body);

registerServiceWorker();
