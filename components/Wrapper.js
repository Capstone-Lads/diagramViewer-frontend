import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import UploadDiagram from './UploadDiagram';
import DiagramViewer from './DiagramViewer';
const diagramEndpoint = "http://141.216.25.181/diagram/"

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSidebar: true,
			modules: ["Diagram Viewer", "Upload Diagram"],
			currentModule: 0,
		};

		this.toggleSidebar = this.toggleSidebar.bind(this);
	}

	toggleSidebar() {
		this.setState({ showSidebar: !this.state.showSidebar });
	}

	render() {
		const sidebarItems = this.state.modules.map((x, i) =>
			<li key={i} className={this.state.currentModule === i ? "selected" : ""}>
				<button onClick={() => this.setState({ currentModule: i })} >
					{x}
				</button>
			</li>
		);

		if (this.state.currentModule === 0) {
			content = <DiagramViewer endpoint={diagramEndpoint} />
		} else if (this.state.currentModule === 1) {
			content = <UploadDiagram endpoint={diagramEndpoint} />
		}

		return (
			<div id="wrapper">
				<div id="sidebar" className={this.state.showSidebar ? "show" : ""}>
					<ul>
						{sidebarItems}
					</ul>
					<button id="toggle-sidebar" onClick={this.toggleSidebar}>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
				<div id="content">
					{content}
				</div>
			</div>
		)
	}
}

export default Wrapper;