import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Joystick from './Joystick';
import AttackBtn from './AttackBtn';

export default class GameControls extends SuperComponent {
	render() {
		return (
			<div id="game-controls">

				<div className="controls__attacks">
					<AttackBtn order={1}></AttackBtn>
					<AttackBtn order={2}></AttackBtn>
					<AttackBtn order={3}></AttackBtn>
					<AttackBtn order={4}></AttackBtn>
				</div>
				<Joystick />
			</div>
		);
	}
}
