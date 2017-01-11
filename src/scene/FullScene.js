// import React from 'react';
import Scene from './Scene';


export default class FullScene extends Scene {
	componentDidMount() {
		this.sceneEl = document.querySelector(this.props.target);
		this.init();
	}

	setDimensions() {
		let target = this.sceneEl;
		this.width = this.canvas.width = Math.floor(target.offsetWidth);
		this.height = this.canvas.height = Math.floor(target.offsetHeight);
	}

	positionCanvas() {
		return false;
	}

}
