import React from 'react';
import SuperComponent from '../shared/SuperComponent';
const Scenes = require('./Scenes');
const GameLoop = require('../gameloop/GameLoop');
import Utils from '../utils/utils';
import Quadrant from '../collisions/Quadrant';
import Obstacle from '../collisions/Obstacle';
import GameState from '../shared/GameState';

const required = [];

class Scene extends SuperComponent {

	constructor(props) {
		Utils.requiredProps(required, props);
		super(props);

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
		this.init();
	}

	init() {
		this.registerCanvas();
		this.addActors();
		this.handleObstacles();
		this.add
		this.scaleCanvas();
		Utils.debounce.on('resize', this.scaleCanvas.bind(this));
	}

	registerCanvas() {
		this.canvas = Scenes.register(this.props.id, document.getElementById(this.props.id));
		this.ctx = this.canvas.getContext('2d');
	}

	addActors() {
		if (this.props.enemies) {
			this.props.enemies.forEach(enemy => {
				let enemyScene = Object.assign({}, this);
				let canvas = document.createElement('canvas');
				canvas.className = 'scene';
				canvas.width = this.canvas.width;
				canvas.height = this.canvas.height;

				enemyScene.canvas = canvas;
				this.canvas.parentElement.insertAdjacentElement('afterbegin', enemyScene.canvas);
				enemy.addScene(enemyScene);
				GameLoop.register(enemy.render.bind(enemy));
				if (enemy.events) {
					enemy.events();
				}

			});
		}
		this.props.actors.forEach(actor => {
			actor.addScene(this);
			actor.addEnemies(this.props.enemies);
			GameLoop.register(actor.render.bind(actor));
			if (actor.events) {
				actor.events();
			}
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

	scaleCanvas() {
		let scaleX = (window.innerWidth - 20) / this.canvas.width;
		let scaleY = (window.innerHeight - 20) / this.canvas.height;
		let parent = this.canvas.parentElement;
		let scaleToFit = Utils.toFixed(Math.min(scaleX, scaleY), 4);
		if (scaleToFit > 2) {
			scaleToFit = 2;
		}

		parent.style.transform = `scale3d(${scaleToFit}, ${scaleToFit}, ${scaleToFit}) ${(parent.id === 'game-scene-wrapper' && 'translate3d(-50%, -50%, 0)')}`;
	}

	componentWillUnmount() {
		Scenes.unregister(this.props.id);
		this.removeObstacles();
		this.removeActors();
		Utils.debounce.off('resize', this.scaleCanvas.bind(this));
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
			<div id={this.props.id + '-wrapper' || ''} className="scene-wrapper" style={{width: `${this.props.width}px`, height: `${this.props.height}px`}}>
				{
					this.props.bg &&
					<img id={this.props.bgId} width={this.props.width} height={this.props.height} src={this.props.bg} className="bg"/>
				}
				<canvas id={this.props.id || ''} width={this.props.width} height={this.props.height} className="scene"></canvas>
			</div>
		)
	}
}

export default Scene;
