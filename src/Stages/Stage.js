import React, { Component } from 'react';
import Scene from '../scene/Scene';
import GameState from '../shared/GameState';

export default class Stage extends Component {
	render() {
		return (
			<Scene
			id={`Stage-${this.props.id}`}
			actors={[GameState.character]}
			enemies={this.props.enemies}
			staticActors={this.props.staticActors}
			obstacles={this.props.obstacles}
			width="800"
			height="450"
			 />
		 );
	}
}
