import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Btn from './Btn';
import { removeProfileCards } from '../actor/StaticActorMethods';

class MainMenu extends SuperComponent {

	componentWillMount() {
		removeProfileCards();
	}

	render() {
		return (
			<div>
				<h1 className="title">The Legend of the SuperSand Saiyan!</h1>
				<div className="main-menu__btns">
					<Btn setView="controls">Controls</Btn>
					<Btn setView="choose">New Game</Btn>
					<Btn setView="load">Load Game</Btn>
				</div>
			</div>
		);
	}
}

export default MainMenu;
