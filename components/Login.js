import React from 'react';

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state);
		this.state.username = "";
		this.state.password = "";
		// do api call
		// if api call returns good login:
		this.props.callback(true);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<div id="login-div">
				<form id="login-form" onSubmit={this.handleSubmit}>
					<label htmlFor="username">Username</label>
					<br />
					<input onChange={this.handleChange} value={this.state.username} type="text" name="username" id="username"></input>
					<br />
					<label htmlFor="password">Password</label>
					<br />
					<input onChange={this.handleChange} value={this.state.password} type="password" name="password" id="password"></input>
					<br />
					<input type="submit" value="login"></input>
				</form>
			</div >
		)
	}
}

export default Login;
