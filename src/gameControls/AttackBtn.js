import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import GameState from '../shared/GameState';

let btnId = 1;
let letters = [
	'A', 'S', 'D', 'F'
];

export default class AttackBtn extends SuperComponent {

	constructor(props) {
		super(props);
		this.id = btnId;
		this.letter = letters[btnId - 1];
		this.key = `attack${btnId}`;
		btnId++;
	}

	startAttack() {
		console.log('startAttack');
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
