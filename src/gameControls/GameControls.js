import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Utils from '../utils/utils';
import Joystick from './Joystick';
import AttackBtn from './AttackBtn';

export default class GameControls extends SuperComponent {
	render() {
		return (
			<div id="game-controls">
				<div className="controls__attacks">
					<AttackBtn></AttackBtn>
					<AttackBtn></AttackBtn>
					<AttackBtn></AttackBtn>
					<AttackBtn></AttackBtn>
				</div>
				<Joystick />
			</div>
		);
	}
}
