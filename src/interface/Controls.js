import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Btn from './Btn';
// var GameState = require('../shared/GameState');

class Controls extends SuperComponent {

	render() {
		return (
			<div>
				<h2>Controls</h2>
				<p>Arrow keys to move</p>
				<p>Press F to hit</p>
				<p>Press G to transform</p>
				<Btn setView="main">Main Menu</Btn>
			</div>
		);
	}
}

export default Controls;
