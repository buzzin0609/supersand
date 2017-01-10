import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Btn from '../interface/Btn';

export default class GameInterface extends SuperComponent {
	render() {
		return (
			<div className="game-interface">
				<Btn setView="pause">Pause</Btn>
			</div>
		)
	}
}
