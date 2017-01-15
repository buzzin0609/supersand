import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import GameState from '../shared/GameState';
import MainMenu from './MainMenu';
import Controls from './Controls';
import Choose from './ChooseCharacter';
import GameInterface from '../game/GameInterface';
import NewGame from './NewGame';
import SetSecret from './SetSecret';
import LoadGame from './LoadGame';
import BeforeSave from './BeforeSave';
import SaveGame from './SaveGame';
import ForgotPassword from './ForgotPassword';
import Pause from './Pause';
// var GameState = require('../shared/GameState');

import Goku from '../Goku/Goku';
import Vegeta from '../Vegeta/Vegeta';
import Chad from '../Chad/Chad';

GameState.set('characters', [
	Vegeta,
	Goku,
	Chad
]);

class Interface extends SuperComponent {
	constructor(props) {
		super(props);

		this.state = {
			view : 'main',
			classes : ''
		};

		this.On.set('setView', this.setView.bind(this));
		this.addedToGameStart = false;

	}

	componentWillMount() {
		this.addClass(this.state.view);
		if (!this.addedToGameStart) {
			this.addedToGameStart = true;
			GameState.on('start', this.setView.bind(this, 'game'));
		}
	}

	async setView(name) {
		this.addClass('loading');
		await this.transition();
		this.removeClass([this.state.view, 'loading'].join(' '), () => {
			this.setState({
				view : name
			});
			this.addClass(name);
		});
	}


	get content() {
		var content;

		switch (this.state.view) {
			case 'main':
				content = <MainMenu />;
				break;
			case 'controls':
				content = <Controls />;
				break;
			case 'pause':
				content = <Pause />;
				break;
			case 'choose':
				content = <Choose />;
				break;
			case 'new':
				content = <NewGame />;
				break;
			case 'setSecret':
				content = <SetSecret />;
				break;
			case 'getSecret':
				content = <SetSecret />;
				break;
			case 'answerSecret':
				content = <SetSecret />;
				break;
			case 'forgotPassword':
				content = <ForgotPassword />;
				break;
			case 'load':
				content = <LoadGame />;
				break;
			case 'beforeSave':
				content = <BeforeSave />;
				break;
			case 'save':
				content = <SaveGame />;
				break;
			case 'game':
				content = <GameInterface />;
				break;
			default:
				content = (
					<div>No content chosen</div>
				)
		}
		return content;
	}

	render() {
		var content = this.content;

		return (
			<section id="interface" className={ this.state.classes }>
				<div className="overlay"></div>
				{ content }
			</section>
		);
	}
}

export default Interface;
