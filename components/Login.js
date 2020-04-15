import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
const loginEndpoint = "http://141.216.25.181/rest-auth/login/";

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

class LoginForm extends React.Component {

	constructor(props) {
		super(props);

		let cusername = getCookie("username");
		this.state = {
			username: cusername,
			password: "",
			loading: false,
			showPassword: false,
			rememberUsername: Boolean(cusername),
			badLogin: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ loading: true });

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
				this.setState({ loading: false });
				if (res.status === 200) {
					if (rememberUsername) {
						setCookie("username", this.state.username, 14);
					}

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
		const target = e.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		this.setState({ [target.name]: value });
	}

	togglePasswordVisibility(e) {
		e.preventDefault();
		this.setState({ showPassword: !this.state.showPassword })
	}

	render() {
		return (
			<div id="login-div">
				<form id="login-form" onSubmit={this.handleSubmit}>
					<h1>IT Training System</h1>
					<input
						onChange={this.handleChange}
						value={this.state.username}
						type="text"
						size="20"
						placeholder="Username"
						id="username"
						name="username">
					</input>
					<br />
					<input
						onChange={this.handleChange}
						value={this.state.password}
						type={this.state.showPassword ? "text" : "password"}
						size="20"
						placeholder="Password"
						name="password"
						id="password">
					</input>

					<span id="toggle-password">
						<FontAwesomeIcon onClick={this.togglePasswordVisibility} icon={this.state.showPassword ? faEyeSlash : faEye} />
					</span>
					<br />
					<input type="checkbox" id="rememberUsername" name="rememberUsername" checked={this.state.rememberUsername} onChange={this.handleChange}></input>
					<label id="remember-label" htmlFor="rememberUsername">Remember username</label>
					<br />
					{this.state.loading ? <FontAwesomeIcon className="fa-spin" id="loading" icon={faCircleNotch} /> : <input type="submit" value="Sign In"></input>}
					{this.state.badLogin ? <p id="bad-login">Incorrect username or password</p> : null}
				</form>
			</div >
		)
	}
}

export default LoginForm;
