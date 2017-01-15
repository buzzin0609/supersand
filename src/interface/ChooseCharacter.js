import React from 'react';
import SuperComponent from '../shared/SuperComponent';
var GameState = require('../shared/GameState');
import Btn from './Btn';
import Goku from '../Goku/Goku';
import Vegeta from '../Vegeta/Vegeta';

class ChooseCharacter extends SuperComponent {

	constructor(props) {
		super(props);

		this.characters = [
			Vegeta(),
			Goku()
		];
	}

	setCharacter(Character) {
		GameState.character = Character;
		GameState.start.call(GameState);
		this.On.trigger('setView', 'game');
	}

	outputCharacters() {
		var jsx = [];
		this.characters.forEach(character => {
			jsx.push(
				<article key={character.name} className="character" onClick={ this.setCharacter.bind(this, character) }>
					<img src={ 'img/' + character.profilePic } alt={`Choose ${character.name}`}/>
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
					<Btn setView="main">Main Menu</Btn>
				</footer>
			</div>
		);
	}
}

export default ChooseCharacter;
