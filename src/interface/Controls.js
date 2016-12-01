import React from 'react';
import SuperComponent from '../shared/SuperComponent';
// var GameState = require('../shared/GameState');

class Controls extends SuperComponent {

	render() {
		return (
			<div>
				<h2>Controls</h2>
				<p>Arrow keys to move</p>
				<p>Press F to hit</p>
				<p>Press G to transform</p>
				<span className="btn" onClick={ this.On.trigger.bind(this, 'setView', 'main') }>Main Menu</span>
				<span className="btn" onClick={ this.On.trigger.bind(this, 'setView', 'choose') }>Choose Character</span>
			</div>
		);
	}
}

export default Controls;
