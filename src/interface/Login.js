import React from 'react';
import PostForm from './PostForm';
import GameState from '../shared/GameState';
import Btn from './Btn';

export default class Login extends PostForm {

	constructor(props) {
		super(props);

		Object.assign(this.state, {
			player: GameState.get('player')
		});
	}

	componentDidMount() {
		if (this.state.player) {
			this.cancelSubmit = true;
		}
	}

	afterSubmit(response) {
		if (!this.state.player) {
			let { player } = response;
			GameState.set('player', player);
			this.setState({
				player : player
			});

		}
	}

	onError(e) {
		this.setState({
			error : 'unsuccessful login attempt, please try again',
			submitText : 'login/register'
		});
	}

	afterRender() {
		return (
			<div>
				<Btn setView="main">Main Menu</Btn>
				<Btn setView="forgotPassword">Forgot password?</Btn>
			</div>
		);
	}

}
