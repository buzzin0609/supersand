import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import GameState from '../shared/GameState';

let letters = [
	'A', 'S', 'D', 'F'
];

export default class AttackBtn extends SuperComponent {

	constructor(props) {
		super(props);
		let { order } = props;
		this.id = order;
		this.letter = letters[order - 1];
		this.key = `attack${order}`;
	}

	startAttack() {
		let e = {
			key : this.letter.toLowerCase()
		};

		GameState.character.keydown(e);
	}


	render() {
		return (
			<div className={`attack-btn attack-btn--${this.id}`} onTouchStart={this.startAttack.bind(this)}>
				{this.letter}
			</div>
		);
	}
}
