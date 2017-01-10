import React from 'react';
import SuperComponent from './shared/SuperComponent';
import Interface from './interface/Interface';
import PreGame from './pregame/PreGame';
import Game from './game/Game';

var GameState = require('./shared/GameState');
// console.log(GameState);

class Supersand extends SuperComponent {

	constructor(props) {
		super(props);
		this.state = {
			content : <PreGame />
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
		console.log('triggering on stop');
		this.content = <PreGame />;
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
