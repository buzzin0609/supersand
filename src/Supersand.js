import React from 'react';
import SuperComponent from './shared/SuperComponent';
import Interface from './interface/Interface';
// import PreGame from './pregame/PreGame';
import Game from './game/Game';
import './events/GlobalEvents';
import GameState from './shared/GameState';

import Goku from './actor/Goku/Goku';
import Vegeta from './actor/Vegeta/Vegeta';
import Trunks from './actor/Trunks/Trunks';

GameState.set('characters', [
	Vegeta,
	Goku,
	Trunks
]);
// console.log(GameState);

class Supersand extends SuperComponent {

	constructor(props) {
		super(props);
		this.state = {
			content : ""
		};
		GameState.on('start', this.onStart.bind(this));
		GameState.on('stop', this.onStop.bind(this));

	}

	get content() {
		return this.state.content;
	}

	set content(jsx) {
		this.setState({
			content : jsx
		});
	}

	onStart() {
		this.content = <Game />;
	}

	onStop() {
		this.content = "";
	}

	render() {
		return (
			<article id="supersand">
				<Interface />
				{ this.content }
			</article>
		)
	}
}

export default Supersand;

