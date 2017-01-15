import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Btn from './Btn';

class MainMenu extends SuperComponent {

	render() {
		return (
			<div>
				<h1 className="title">The Legend of the SuperSand Saiyan!</h1>
				<Btn setView="controls">Controls</Btn>
				<Btn setView="choose">New Game</Btn>
				<Btn setView="load">Load Game</Btn>
			</div>
		);
	}
}

export default MainMenu;
