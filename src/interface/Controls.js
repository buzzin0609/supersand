import React from 'react';
import SuperComponent from '../shared/SuperComponent';
// var GameState = require('../shared/GameState');

class Controls extends SuperComponent {

	render() {
		return (
			<div>
				<h2>Controls</h2>
				<p>Use the arrow keys to move</p>
				<p>Press F to hit</p>
				<p>Press G to transform</p>
				<span className="btn" onClick={ this.props.setView.bind(this, 'main') }>Main Menu</span>
				<span className="btn" onClick={ this.props.setView.bind(this, 'choose') }>Choose Character</span>
			</div>
		);
	}
}

export default Controls;
