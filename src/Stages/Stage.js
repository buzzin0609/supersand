import React, { Component } from 'react';
import Scene from '../scene/Scene';
import GameState from '../shared/GameState';

var StageCount = 1;
export default class Stage extends Component {
	render() {
		return (
			<Scene
			id={`Stage-${StageCount++}`}
			actors={[GameState.character]}
			enemies={this.props.enemies}
			obstacles={this.props.obstacles}
			width="800"
			height="450"
			 />
		 );
	}
}
