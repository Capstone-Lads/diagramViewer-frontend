import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
const diagramEndpoint = "http://141.216.25.181/diagram/"

class UploadDiagram extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			type: "",
			choices: [],
			displayNames: [],
			error: false,
			loading: true,
			POSTloading: false,
			success: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	// get a list of valid types
	componentDidMount() {
		fetch(diagramEndpoint, {
			method: 'OPTIONS'
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				const dataChoices = data.actions.POST.diagram_type.choices;
				this.setState({
					choices: dataChoices.map(x => x.value),
					displayNames: dataChoices.map(x => x.display_name),
					type: dataChoices[0].value,
					loading: false,
				});
			});
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({
			POSTloading: true,
			success: false,
		});

		let postData = {
			name: this.state.name,
			description: this.state.description,
			diagram_type: this.state.type,
		}

		fetch(diagramEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		})
			.then(res => {
				this.setState({ POSTloading: false })
				if (res.status === 201) {
					this.setState({
						error: false,
						success: true,
					})
					return false;
				} else {
					this.setState({ error: true })
					return res.json();
				}
			})
			.then(data => {
				if (this.state.error) {
					const keys = Object.keys(data);
					let errorString = "";
					keys.forEach(key => {
						errorString += "ERROR: " + key + " " + data[key] + "\n";
					})
					this.setState({ error: errorString })
				}
			});
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {

		const selectChoices = this.state.choices.map((x, i) =>
			<option value={x} key={i}>{this.state.displayNames[i]}</option>
		);
		return (
			<div id="upload-diagram">
				<h1>Upload Diagram</h1>
				{this.state.loading ? <FontAwesomeIcon className="fa-spin" id="loading" icon={faCircleNotch} /> :
					<div id="upload-diagram-form">
						<div id="upload-diagram-labels">
							<label htmlFor="name">Name: </label><br />
							<label htmlFor="description">Description: </label><br />
							<label htmlFor="type">Type: </label><br />
						</div>
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								size="70"
								value={this.state.name}
								id="name"
								name="name"
								onChange={this.handleChange}>
							</input>
							<br />
							<input
								type="text"
								size="70"
								value={this.state.description}
								id="description"
								name="description"
								onChange={this.handleChange}>
							</input>
							<br />
							<select
								value={this.state.type}
								id="type"
								name="type"
								onChange={this.handleChange}>
								{selectChoices}
							</select>
							<br />
							{this.state.POSTloading ? <FontAwesomeIcon className="fa-spin" id="loading" icon={faCircleNotch} /> :
								<input type="submit" value="Submit"></input>}
						</form>
					</div>
				}
				{this.state.error ? <div className="error">{this.state.error}</div> : null}
				{this.state.success ? <div id="upload-diagram-success">Diagram uploaded successfully.</div> : null}
			</div>
		);
	}
}

export default UploadDiagram;