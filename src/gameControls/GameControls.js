import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Utils from '../utils/utils';
import Joystick from './Joystick';

export default class GameControls extends SuperComponent {
	render() {
		return (
			<div id="game-controls">
				<Joystick />
			</div>
		);
	}
}
