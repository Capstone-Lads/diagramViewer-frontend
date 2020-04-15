import React from 'react';

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modules: ["Diagram Viewer", "Upload Diagram"],
			currentModule: 0,
		};

		this.handleSidebarClick = this.handleSidebarClick.bind(this);
	}

	handleSidebarClick(e) {
		e.preventDefault();
		console.log(e);
	}

	render() {
		const sidebarItems = this.state.modules.map((x, i) =>
			<li key={i} className={this.state.currentModule === i ? "selected" : ""}>
				<button onClick={() => this.setState({currentModule: i})} >
					{x}
				</button>
			</li>
		);

		if (this.state.currentModule === 0) {
			// diagram viewer
			content = <div id="diagram-viewer">diagram viewer</div>
		} else if (this.state.currentModule === 1) {
			content = <div id="upload-diagram">upload diagram</div>
		}

		return (
			<div id="wrapper">
				<div id="sidebar">
					<ul>
						{sidebarItems}
					</ul>
				</div>
				<div id="content">
					{content}
				</div>
			</div>
		)
	}
}

export default Wrapper;