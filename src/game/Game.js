import React, { Component } from 'react';
import Scene from '../scene/Scene';
import GameLoop from '../gameloop/GameLoop';
import GameState from '../shared/GameState';
import GameControls from '../gameControls/GameControls';
import Stages from '../Stages/Stages';


export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage : GameState.get('stage') || 1
		}
		// console.log(this.state);
	}

	componentDidMount() {
		// console.log('mounted game');
		GameLoop.start.call(GameLoop);
	}

	componentWillUnmount() {
		GameLoop.stop.call(GameLoop);
	}

	render() {
		return (
			<div className="wrapper">
				<div id="game">
					{Stages.get(this.state.stage)}
				</div>
				<GameControls />
			</div>
		)
	}

}
