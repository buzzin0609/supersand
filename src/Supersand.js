import React, { Component } from 'react';
import Interface from './interface/Interface';
import PreGame from './pregame/PreGame';

// var Actor = require('./actor/Actor');
// console.log(new Actor('Goku', {
// 	imgUrl : 'goku.jpg',
// 	frameLen : 8,
// 	frameTicks : 10
// }));
var GameState = require('./shared/GameState');
// console.log(GameState);

class Supersand extends Component {

	constructor(props) {
		super(props);
		this.state = {
			content : <PreGame />
		};
	}

	set content(jsx) {
		this.setState({
			content : jsx
		});
	}

	render() {

		GameState.on('start', () => {
			this.content = (
				<p>started</p>

			);
		});
		return (
			<article id="supersand">
				<Interface />
				{ this.state.content }
			</article>
		)
	}
}

export default Supersand;
