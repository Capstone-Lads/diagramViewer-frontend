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
			diagramTypeChoices: [],
			diagramTypeDisplayNames: [],
			error: false,
			loading: true,
			POSTloading: false,
			success: false,
		};

		this.fileInput = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.inputSize = 50;
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
				const diagramChoices = data.actions.POST.diagram_type.choices;
				this.setState({
					diagramTypeChoices: diagramChoices.map(x => x.value),
					diagramTypeDisplayNames: diagramChoices.map(x => x.display_name),
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

		let postData = new FormData();
		postData.append("name", this.state.name);
		postData.append("description", this.state.description);
		postData.append("diagram_type", this.state.type);
		const files = this.fileInput.current.files;
		for (let i = 0; i < files.length; i++) {
			postData.append("file", files[i]);
		}

		fetch(diagramEndpoint, {
			method: 'POST',
			body: postData,
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
					console.error(res);
					this.setState({ error: true })
					return res.json();
				}
			})
			.then(data => {
				if (this.state.error) {
					console.error(data);
					const keys = Object.keys(data);
					let errorString = "";
					keys.forEach(key => {
						errorString += "ERROR:\n" + key + ": " + data[key] + "\n";
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

		const selectChoices = this.state.diagramTypeChoices.map((x, i) =>
			<option value={x} key={i}>{this.state.diagramTypeDisplayNames[i]}</option>
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
							<label htmlFor="file">Files: </label><br />
						</div>
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								size={this.inputSize}
								value={this.state.name}
								id="name"
								name="name"
								required
								onChange={this.handleChange}>
							</input>
							<br />
							<input
								type="text"
								size={this.inputSize}
								value={this.state.description}
								id="description"
								name="description"
								required
								onChange={this.handleChange}>
							</input>
							<br />
							<select
								value={this.state.type}
								id="type"
								name="type"
								required
								onChange={this.handleChange}>
								<option disabled value=""> -- select a type -- </option>
								{selectChoices}
							</select>
							<br />
							<input accept="image/*" name="file" type="file" ref={this.fileInput} multiple required></input>
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