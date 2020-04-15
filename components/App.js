import React from 'react';
import LoginForm from './Login';
import Wrapper from './Wrapper';

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
    this.setState({ darkMode: !this.state.darkMode });
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
        {this.state.userIsLoggedIn ?
          <Wrapper />
          : <LoginForm callback={this.loginCallback} />
        }
        <button id="dark-mode-toggle" onClick={this.toggleDarkMode}>{this.state.darkMode ? "Light Mode" : "Dark Mode"}</button>
      </div>
    )
  }
}

export default App;