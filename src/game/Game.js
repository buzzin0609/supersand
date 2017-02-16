import React, { Component } from 'react';
import GameLoop from '../gameloop/GameLoop';
import GameState from '../shared/GameState';
import GameControls from '../gameControls/GameControls';
import Stages from '../Stages/Stages';
import ProfileInterface from './ProfileInterface';
import On from '../utils/On';


export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage : GameState.get('stage') || 1
		}

		On.set('next-stage', this.nextStage.bind(this));
		// console.log(this.state);
	}

	componentDidMount() {
		// console.log('mounted game');
		GameLoop.start.call(GameLoop);
		
	}

	componentWillUnmount() {
		GameLoop.stop.call(GameLoop);
	}

	nextStage() {
		let stage = GameState.get('stage');
		stage++;
		this.setState({
			stage
		});
	}

	render() {
		return (
			<div className="wrapper">
				<ProfileInterface />
				<div id="game">
					{Stages.get(this.state.stage)}
				</div>
				<GameControls />
			</div>
		)
	}

}
