import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import todoApp from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

let store = createStore(todoApp);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App}></Route>
    </Router>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
