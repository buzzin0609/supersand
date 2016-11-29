import React, { Component } from 'react';
var Scenes = require('./Scenes');
var GameLoop = require('../gameloop/GameLoop');
import Utils from '../utils/utils';

console.log(Utils);

var required = [
	'target'
];

class Scene extends Component {

	constructor(props) {
		Utils.requiredProps(required, props);
		super(props);


		this.sceneEl = false;
		this.canvas = false;
	}

	setDimensions() {

		var target = this.sceneEl;
		var percents = this.scenePercentages;

		this.canvas.width = target.offsetWidth * percents.width;
		this.canvas.height = target.offsetHeight * percents.height;
	}

	positionCanvas() {
		var el = this.sceneEl;
		var rect = el.getBoundingClientRect();
		var diff = {
			width : (rect.width - this.canvas.width) / 2,
			height : (rect.height - this.canvas.height) / 2
		};
		this.canvas.style.cssText = `position: absolute; top: ${rect.top + diff.height}px; left: ${rect.left + diff.height}px`;
	}

	componentDidMount() {

		this.elPromise = Utils.isImg(document.querySelector(this.props.target));

		this.elPromise.then(el => {
			this.sceneEl = el;
			var sceneArea = el.getAttribute('data-scene-area').split(' ').map(val => parseInt(val, 10));
			this.scenePercentages = {
				width : parseFloat((sceneArea[0] / el.naturalWidth).toFixed(2)),
				height : parseFloat((sceneArea[1] / el.naturalHeight).toFixed(2))
			};
			this.canvas = Scenes.register(this.props.id, document.getElementById(this.props.id));
			this.setDimensions();
			this.positionCanvas();
			this.props.actors.forEach(actor => {
				actor.addScene(this);
				GameLoop.register(actor.render.bind(actor));
			});

		});


		Utils.debounce.on('resize', [this.setDimensions.bind(this), this.positionCanvas.bind(this)]);

		// console.log(GameLoop);
	}
	componentWillUnmount() {
		Scenes.unregister(this.props.id);
	}

	render() {
		return (
			<canvas id={this.props.id || ''}></canvas>
		)
	}
}

export default Scene;
