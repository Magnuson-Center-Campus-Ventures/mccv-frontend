/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/nav.scss';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/app';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

const token = localStorage.getItem('token');
const userID = localStorage.getItem('userID');
if (token && userID) {
  // store.dispatch({ type: 'FETCH_USER', id: userID });
  store.dispatch({ type: 'AUTH_USER', id: userID }); // NOT SURE what to do about this since no AUTH_USER
}

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
