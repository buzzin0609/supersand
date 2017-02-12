import React from 'react';
import SuperComponent from '../shared/SuperComponent';
var GameState = require('../shared/GameState');
import Btn from './Btn';


class ChooseCharacter extends SuperComponent {

	constructor(props) {
		super(props);

		this.characters = GameState.get('characters');

	}

	setCharacter(Character) {
		GameState.character = Character;
		GameState.set('stage', 1);
		GameState.start.call(GameState);
		this.On.trigger('setView', 'game');
	}

	outputCharacters() {
		var jsx = [];
		this.characters.forEach(character => {
			character = character();
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
				<h2 className="title">Choose character</h2>
				<p className="tagline">Which hero is going to be Supersand legend</p>
				<div className="characters">
					<div className="characters__scroll-wrap group">
						{ this.outputCharacters() }
					</div>
				</div>

				<footer>
					<Btn setView="main">Main Menu</Btn>
				</footer>
			</div>
		);
	}
}

export default ChooseCharacter;
