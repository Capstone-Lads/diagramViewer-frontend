import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Login';
import './main.css';

let userIsLoggedIn = false;

function loginCallback(a) {
  console.log(a);
  userIsLoggedIn = a;
  render();
}

function render() {
  if (userIsLoggedIn) {
    ReactDOM.render(
      <App content="Hello World!" />,
      document.getElementById('root')
    );
  } else {
    ReactDOM.render(
      <Login callback={loginCallback} />,
      document.getElementById('root')
    )
  }
}

render();