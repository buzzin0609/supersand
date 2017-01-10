import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Btn from '../interface/Btn';
import GameLoop from '../gameloop/GameLoop';
import GameState from '../shared/GameState';

export default class GameInterface extends SuperComponent {

	componentWillMount() {
		GameLoop.stop.call(GameLoop);
	}

	render() {
		return (
			<div>
				<h2>Game Paused</h2>
				<Btn setView="game" clickHandlers={ [ GameLoop.start.bind(GameLoop) ] }>Resume</Btn>
				<Btn setView="save">Save Game</Btn>
				<Btn setView="main" clickHandlers={ [ GameState.stop.bind(GameState) ] }>Main Menu</Btn>
			</div>
		)
	}
}
