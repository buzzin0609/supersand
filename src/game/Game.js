import React, { Component } from 'react';
import FullScene from '../scene/FullScene';
import GameLoop from '../gameloop/GameLoop';
import GameState from '../shared/GameState';
import walls from './gameObstacles';


export default class Game extends Component {

	componentWillMount() {
		console.log(GameState.character, 'about to mount actor');
	}

	componentDidMount() {
		console.log('mounted game');
		GameLoop.start.call(GameLoop);
	}

	componentWillUnmount() {
		GameLoop.stop.call(GameLoop);
	}

	render() {
		return (
			<div className="wrapper">
				<div id="game">
					<FullScene id="game-scene" actors={[GameState.character]} obstacles={walls} target="#game" />
				</div>
			</div>
		)
	}

}
