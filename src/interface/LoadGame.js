import React from 'react';
import Login from './Login';
import GameState from '../shared/GameState';
import Btn from './Btn';
import KeyboardActor from '../actor/KeyboardActor';

export default class LoadGame extends Login {
	constructor(props) {
		super(props);
		Object.assign(this.state, {
			submitText : 'login',
			title : 'Load game',
			subtitle : 'Type your username and password'
		});

	}

	componentWillMount() {
		let { player } = this.state;

		if (player) {
			if (!player.games.length) {
				this.noGames();
			} else {
				this.outputGames();
			}
		}
	}

	async noGames() {
		this.setState({
			error : `You don't have any saved games. Now starting a new game...`,
			submitText : false,
			inputs : false,
			subtitle : ''
		});
		await this.transition(2000);
		this.On.trigger('setView', 'choose');
	}

	outputGames() {
		this.setState({
			submitText: false,
			inputs: false,
			subtitle: 'Choose a game'
		});
	}

	beforeInputs() {
		let { player } = this.state;
		if (player && player.games && player.games.length) {
			return player.games.map(game => {
				let handlers = [
					this.handleLoadGame.bind(this, game),
					GameState.start.bind(GameState)
				];
				return <Btn setView="game" clickHandlers={handlers} key={game.id}>{game.saveName}</Btn>
			});
		}
	}

	handleLoadGame(game) {
		console.log(game.character, 'saved character');
		let character = new KeyboardActor(game.character);
		game.character = character;
		GameState.character = character;
		GameState.set('stage', game.stage);
		GameState.set('gameLoaded', true);


	}

	afterSubmit(response) {
		super.afterSubmit(response);

		if (!this.state.player.games.length) {
			this.noGames();
		} else {
			this.outputGames();
		}
	}
}
