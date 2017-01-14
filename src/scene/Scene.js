import React from 'react';
import SuperComponent from '../shared/SuperComponent';
const Scenes = require('./Scenes');
const GameLoop = require('../gameloop/GameLoop');
import Utils from '../utils/utils';
import Quadrant from '../collisions/Quadrant';
import Obstacle from '../collisions/Obstacle';
import GameState from '../shared/GameState';

const required = [
	'target'
];

class Scene extends SuperComponent {

	constructor(props) {
		Utils.requiredProps(required, props);
		super(props);

		this.sceneEl = false;
		this.canvas = false;
		this.quadrants = this.obstacles = [];
		this.startPosition = this.props.startPosition || {
			x : 0.5,
			y : 0.5
		};

	}

	componentWillMount() {
		GameState.set('scene', this);
	}

	componentDidMount() {

		this.elPromise = Utils.isImg(document.querySelector(this.props.target));

		this.elPromise.then(el => {
			this.sceneEl = el;
			this.init();

		});
	}

	init() {
		this.registerCanvas();
		this.setDimensions();
		this.positionCanvas();
		this.addActors();
		this.handleObstacles();
		Utils.debounce.on('resize', [this.setDimensions.bind(this), this.positionCanvas.bind(this)]);
	}

	registerCanvas() {
		this.canvas = Scenes.register(this.props.id, document.getElementById(this.props.id));
		this.ctx = this.canvas.getContext('2d');
	}

	setDimensions() {

		let target = this.sceneEl;

		this.width = this.canvas.width = Math.floor(target.offsetWidth);
		this.height = this.canvas.height = Math.floor(target.offsetHeight);
	}

	positionCanvas() {
		let el = this.sceneEl;
		let rect = el.getBoundingClientRect();
		let diff = {
			width : (rect.width - this.canvas.width) / 2,
			height : (rect.height - this.canvas.height) / 2
		};
		this.top = rect.top + diff.height;
		this.left = rect.left + diff.height;
		this.canvas.style.cssText = `position: absolute; top: ${this.top}px; left: ${this.left}px`;
	}

	addActors() {
		// console.log(this.props.actors, 'actors');
		this.props.actors.forEach(actor => {
			actor.addScene(this);
			GameLoop.register(actor.render.bind(actor));
			actor.events();
		});
	}

	handleObstacles() {
		if (this.props.obstacles) {
			// console.log(this.props.obstacles);
			this.setQuadrants();
			this.addObstacles();
		}
	}

	setQuadrants() {
		let size = this.props.quadrantSize || 0.5;
		let canvasWidth = this.canvas.width;
		let canvasHeight = this.canvas.height;
		let pxWidth = canvasWidth * size;
		let pxHeight = canvasHeight * size;
		let qNum = Math.ceil((canvasWidth / pxWidth) * (canvasHeight / pxHeight));
		for (let i = 0; i < qNum; i++) {
			this.quadrants.push(new Quadrant(qNum, this, i));
		}

	}

	addObstacles() {
		let obstacles = [];
		for (let i = 0; i < this.props.obstacles.length; i++) {
			var args = this.props.obstacles[i];
			args.scene = this;
			obstacles.push(new Obstacle(args));

		}
		this.obstacles = obstacles;

		for (let i = 0; i < this.quadrants.length; i++) {
			this.quadrants[i].addChildren(obstacles);
		}
	}

	componentWillUnmount() {
		Scenes.unregister(this.props.id);
		this.removeObstacles();
		this.removeActors();
		Utils.debounce.off('resize', [this.setDimensions, this.positionCanvas]);
	}

	removeObstacles() {
		this.obstacles.forEach(obstacle => obstacle.unregister());
	}

	removeActors() {
		this.props.actors.forEach(actor => {
			// console.log('unregistering actor', actor);
			GameLoop.unregister(actor.render.bind(actor)); actor.unMount();
		});
	}

	render() {
		return (
			<canvas id={this.props.id || ''} className="scene"></canvas>
		)
	}
}

export default Scene;
