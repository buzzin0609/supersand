import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Btn from '../interface/Btn';
import GameState from '../shared/GameState';

export default class GameOver extends SuperComponent {

	render() {
		return (
			<div>
				<h2 className="title">Game Over</h2>
				<Btn setView="load">Load Game</Btn>
				<Btn setView="main" clickHandlers={ [ GameState.stop.bind(GameState) ] }>Main Menu</Btn>
			</div>
		)
	}
}
