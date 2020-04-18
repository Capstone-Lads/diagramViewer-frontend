import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

class DiagramViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			diagramList: [],
			selected: "none",
			show: [],
		};

		this.selectDiagram = this.selectDiagram.bind(this);
		this.toggleLayer = this.toggleLayer.bind(this);
		this.closeDiagram = this.closeDiagram.bind(this);
	}

	componentDidMount() {
		fetch(this.props.endpoint)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				} else {
					console.error(res)
					return false;
				}
			})
			.then(data => {
				if (data) {
					this.setState({
						diagramList: data,
						loading: false,
					});
				}
			});
	}

	selectDiagram(i) {
		let length = this.state.diagramList[i].layer_set.length;
		this.setState({
			selected: i,
			show: new Array(length).fill(true),
		});
	}

	toggleLayer(i) {
		let newShow = this.state.show;
		newShow[i] = !newShow[i];
		this.setState({ show: newShow });
	}

	closeDiagram() {
		this.setState({
			selected: "none",
			show: [],
		});
	}

	render() {
		let content;
		if (this.state.selected === "none") {
			// no diagram selected, show list of available diagrams
			const diagramLis = this.state.diagramList.map((x, i) =>
				<li key={i}>
					<button onClick={() => this.selectDiagram(i)}>
						{x.name}
					</button>
				</li>
			);
			content = <ul id="diagram-list">{diagramLis}</ul>
		} else {
			// user has selected a diagram
			// show list of layers and layer images
			const layerSet = this.state.diagramList[this.state.selected].layer_set;
			const layerButtons = layerSet.map((x, i) =>
				<li key={i}>
					<button onClick={() => { this.toggleLayer(i) }}>
						{
							// this jank converts the url of the image into just the filename
							x.image.substring(0, x.image.length - 4).substring(x.image.lastIndexOf('/') + 1)
						}
						&nbsp;
						{this.state.show[i] ? "☑" : "☐"}
					</button>
				</li>
			);
			let imgs = layerSet.map((x, i) =>
				<img className="layer-img" key={i} src={x.image}></img>
			);
			content =
				<div id="diagram-viewer">
					<ul id="layer-selector">
						<h2>{this.state.diagramList[this.state.selected].name}</h2>
						<p>{this.state.diagramList[this.state.selected].description}</p>
						{layerButtons}
						<br /><br />
						<li><button id="close" onClick={() => this.closeDiagram()}>Back to Diagram List</button></li>
						<br />
					</ul>
					<div id="main-diagram-view">
						{imgs.map((image, i) => {
							return this.state.show[i] && image;
						})}
					</div>
				</div >
		}

		return (
			<>
				{this.state.loading ?
					<FontAwesomeIcon className="fa-spin" id="loading" icon={faCircleNotch} /> :
					content
				}
			</>
		);
	}
}

export default DiagramViewer;