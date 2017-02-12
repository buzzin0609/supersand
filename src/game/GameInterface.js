import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Btn from '../interface/Btn';
import handleGameHeight from '../events/handleGameHeight';

export default class GameInterface extends SuperComponent {

	componentDidMount() {
		window.scrollTo(0,0);
		handleGameHeight();
	}

	render() {
		return (
			<div className="game-interface">
				<Btn setView="pause">Menu</Btn>
			</div>
		)
	}
}
