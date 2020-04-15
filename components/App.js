import React from 'react';
import LoginForm from './Login';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      darkMode: true,
      userIsLoggedIn: false,
      apiKey: null,
    }

    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.loginCallback = this.loginCallback.bind(this);
  }

  toggleDarkMode() {
    this.setState({darkMode: !this.state.darkMode});
    const body = document.querySelector('body');
    if (this.state.darkMode) {
      body.className = "dark";
    } else {
      body.className = "";
    }
  }

  loginCallback(loggedIn, data) {
    this.setState({
      userIsLoggedIn: loggedIn,
      apiKey: data
    });
  }

  render() {
    return (
      <div id="app" className={this.state.darkMode ? 'dark' : null}>
        <button id="dark-mode-toggle" onClick={this.toggleDarkMode}>{this.state.darkMode ? "Light Mode" : "Dark Mode"}</button>
        {this.state.userIsLoggedIn ?
          <h1>LOGIN SUCCESSFUL</h1>
          : <LoginForm callback={this.loginCallback} />
        }
      </div>
    )
  }
}

export default App;