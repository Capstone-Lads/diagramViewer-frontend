import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
const loginEndpoint = "http://141.216.25.181/rest-auth/login/";

class LoginForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			showPassword: false,
			badLogin: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		let postData = {
			username: this.state.username,
			password: this.state.password
		}

		fetch(loginEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		})
			.then(res => {
				if (res.status === 200) {
					// we might want to look into browser cookies to remember login
					this.setState({
						username: "",
						password: "",
						badLogin: false,
					});
					return res.json()
				} else if (res.status === 400) {
					this.setState({
						badLogin: true,
					});
				}
				return false;
			})
			.then(data => {
				if (data) {
					this.props.callback(true, data.key);
				}
			});
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	togglePasswordVisibility(e) {
		e.preventDefault();
		this.setState({ showPassword: !this.state.showPassword })
	}

	render() {
		return (
			<div id="login-div">
				<form id="login-form" onSubmit={this.handleSubmit}>
					<h1>Login</h1>
					<label htmlFor="username">Username</label>
					<br />
					<input onChange={this.handleChange} value={this.state.username} type="text" name="username" id="username"></input>
					<br />
					<label htmlFor="password">Password</label>
					<br />
					<input onChange={this.handleChange} value={this.state.password} type={this.state.showPassword ? "text" : "password"} name="password" id="password"></input>
					<FontAwesomeIcon id="toggle-password" onClick={this.togglePasswordVisibility} icon={this.state.showPassword ? faEyeSlash : faEye} />
					<br />
					<input type="submit" value="login"></input>
					{this.state.badLogin ? <p id="bad-login">Incorrect username or password</p> : null}
				</form>
			</div >
		)
	}
}

export default LoginForm;
