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

    this.loginCallback = this.loginCallback.bind(this);
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
          <div>TODO: App Component</div>
          : <LoginForm callback={this.loginCallback} />
        }
      </div>
    )
  }
}

export default App;