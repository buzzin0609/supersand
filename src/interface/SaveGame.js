import React from 'react';
import PostForm from './PostForm';
import GameState from '../shared/GameState';
import Btn from './Btn';
import GameObject from '../game/GameObject';

function pxToPercent(val, dimension) {
	return Math.floor((val / dimension) * 100);
}

export default class SetSecret extends PostForm {

	constructor(props) {
		super(props);
		Object.assign(this.state, {
			error : false,
			submitText : 'save',
			title: 'Save Game Progress',
			subtitle : 'Choose an existing game or enter a save game name',
			inputs: [
				{
					type : 'text',
					name : 'saveName'
				}
			],
			action: '/saveGame'
		});
		this.player = false;
		this.character = false;
	}

	componentWillMount() {
		this.player = GameState.get('player');
		this.character = GameState.character;
		this.overwrite = false;
	}

	beforeInputs() {
		let { player } = this;
		if (player && player.games && player.games.length) {
			return (
				<div className="saved-games">
					{
						player.games.map(game => {
							return <Btn clickHandlers={[this.handleOverwrite.bind(this, game.saveName)]} key={game.id}>{game.saveName}</Btn>
						})
					}
				</div>
			)
		}
		return <p>No saved games</p>;
	}

	handleOverwrite(saveName) {
		this.setState({
			action: '/updateGame',
			inputs: [
				{
					type: 'text',
					name: 'saveName',
					placeholder: saveName,
				}
			],
			message: `Click save to overwrite ${saveName}`
		});

		this.overwrite = saveName;
	}

	afterRender() {
		return <Btn setView="pause">Back</Btn>
	}

	beforeSubmit() {
		let { character } = this;
		let { player } = this;
		this.postData.playerId = player._id;
		let characterToSave = Object.assign({}, character);
		characterToSave.start = {
			x: pxToPercent(characterToSave.position.x, characterToSave.scene.canvas.width) / 100,
			y: pxToPercent(characterToSave.position.y, characterToSave.scene.canvas.height) / 100
		};
		characterToSave.scene = null;
		let args = {
			character : characterToSave,
			saveName : this.overwrite ? this.overwrite : this.postData.saveName
		};
		let game = new GameObject(args);
		// console.log(game);
		this.postData.game = JSON.stringify(game);
	}

	afterSubmit(response) {
		// console.log(response);
		GameState.set('player', response);

		this.On.trigger('setView', 'pause');
	}


}
