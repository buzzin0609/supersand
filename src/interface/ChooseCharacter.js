import React from 'react';
import SuperComponent from '../shared/SuperComponent';
var GameState = require('../shared/GameState');

class ChooseCharacter extends SuperComponent {

	constructor(props) {
		super(props);

		this.characters = [
			{
				name : 'Vegeta',
				img : 'veg-port.png'
			},
			{
				name : 'Goku',
				img : 'gok-port-ss.png'
			}
		];
	}

	setCharacter(name) {
		GameState.character = name;
		GameState.start.call(GameState);
	}

	outputCharacters() {
		var jsx = [];
		this.characters.forEach(character => {
			jsx.push(
				<article key={character.name} className="character" onClick={ this.setCharacter.bind(this, character.name.toLowerCase()) }>
					<img src={ 'img/' + character.img } alt="Choose Vegeta"/>
					<h3>{ character.name }</h3>
				</article>
			);
		});
		return jsx;
	}

	render() {
		return (
			<div id="choose-character">
				<h2>Choose character</h2>
				<p className="tagline">Which hero is going to save the day</p>
				{ this.outputCharacters() }

				<footer>
					<span className="btn" onClick={ this.props.setView.bind(this, 'main') }>Main Menu</span>
				</footer>
			</div>
		);
	}
}

export default ChooseCharacter;
