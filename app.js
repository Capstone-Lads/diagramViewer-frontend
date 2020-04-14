import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './main.css';

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render();