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

				<Scene
					id="pre-game-scene" 
					width="720" height="640"
					actors={[PreGoku()]}
					obstacles={this.obstacles}
					target="#kame-house"
					bg="img/kame-house-map.png"
					bgId="kame-house"
					/>
			</div>
		);
	}
}

export default PreGame;
