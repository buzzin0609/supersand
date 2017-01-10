import React from 'react';
import SuperComponent from '../shared/SuperComponent';
var GameLoop = require('../gameloop/GameLoop');
import Scene from '../scene/Scene';
import PreGoku from './PreGoku';
import obstacles from './preobstacles';

// console.log(obstacles);

class PreGame extends SuperComponent {

	constructor(props) {
		super(props);

		this.obstacles = obstacles;
	}

	componentDidMount() {
		GameLoop.start.call(GameLoop);
	}

	componentWillUnmount() {
		GameLoop.stop.call(GameLoop);
	}

	render() {
		return (
			<div id="pre-game">
				<img id="kame-house" data-scene-area="600 510" src="img/kame-house-map.png" alt="Kame House" className="bg"/>
				<Scene id="pre-game-scene" actors={[PreGoku()]} obstacles={this.obstacles} target="#kame-house" />
			</div>
		);
	}
}

export default PreGame;
