import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import GameState from '../shared/GameState';

const stickDimension = 45;
const offset = stickDimension / 2;

export default class Joystick extends SuperComponent {
	constructor(props) {
		super(props);
		this.dragging = false;
		this.touchStartEvt = false;
		this.touchMoveEvt = false;
		this.touchEndEvt = false;
		this.stick = false;
		this.previousX = false; this.previousY = false;
		this.current = false;
		this.distance = {};
		this.threshold = 20;
	}

	componentDidMount() {
		this.stick = document.getElementsByClassName('joystick__stick')[0];
	}

	onTouchStart(e) {
		if (e.target.closest('.joystick__stick')) {
			this.dragging = true;
			this.previousX = e.touches[0].clientX;
			this.previousY = e.touches[0].clientY;
			this.current = {
				left: this.stick.offsetLeft,
				top: this.stick.offsetTop
			};
		}
	}

	onTouchMove(e) {
		if (this.dragging) {
			let { current, previousX, previousY } = this;
			let touchX = e.touches[0].clientX;
			let touchY = e.touches[0].clientY;

			let distanceX = current.left + (touchX - previousX) - offset;
			let distanceY = current.top + (touchY - previousY) - offset;

			this.setCharacterMove(distanceX, distanceY);

			if (Math.abs(distanceX) < stickDimension) {
				this.distance.x = distanceX;
			}

			if (Math.abs(distanceY) < stickDimension) {
				this.distance.y = distanceY;
			}

			this.setStyle(this.distance.x, this.distance.y);
			// debugger;

		}
	}

	onTouchEnd(e) {
		if (this.dragging) {
			this.dragging = false;
			this.resetStyle();
			this.stopCharacter();
		}
	}

	setCharacterMove(distanceX, distanceY) {
		let sides = [];

		if (distanceX < 0 - this.threshold) {
			sides.push('left');
		}

		if (distanceX > this.threshold) {
			sides.push('right');
		}

		if (distanceY < 0 - this.threshold) {
			sides.push('up')
		}

		if (distanceY > this.threshold) {
			sides.push('down');
		}
		// debugger;
		if (sides.length) {
			this.moveCharacter(sides);
		}
	}

	moveCharacter(sides) {
		let { character } = GameState;
		character.pressed = [];
		Object.keys(character.active).forEach(side => {
			if (sides.includes(side)) {
				character.pressed.unshift(side);
				if (!character.active[side]) {
					character.active[side] = true;
					character.facing = side;
					character.setMoveSrc();
				}
			} else {
				character.active[side] = false;
			}
		});
	}

	stopCharacter() {
		let { character } = GameState;
		character.pressed = [];
		Object.keys(character.active).forEach(side => character.active[side] = false);
	}

	setStyle(x, y) {
		this.stick.style.transform = `translate3d(${x}px, ${y}px, 0)`;
	}

	resetStyle() {
		let self = this;
		let duration = 350;
		let startX = this.distance.x;
		let startY = this.distance.y;
		let targetX = 0, targetY = 0;

		let startTime = Date.now();
		let currentX = startX, currentY = startY;

		stepStyle();

		function stepStyle() {
			let step = Math.min(1,(Date.now()-startTime)/duration) * 2;
			//easeOutQuad
			step = self.ease(step);
			let absX = Math.abs(currentX) > 1, absY = Math.abs(currentY) > 1;
			// debugger;
			if (absX || absY) {
				requestAnimationFrame(stepStyle);
				if (absX) {
					currentX = startX+step*(targetX-startX);
				}
				if (absY) {
					currentY = startY+step*(targetY-startY);
				}
				self.setStyle(currentX, currentY);
			} else {
				self.setStyle(0,0);
			}
		}

	}

	ease(t) {
		return t*(2-t);
	}


	render() {
		return (
			<div id="joystick">
				<div className="joystick__stick" onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}></div>
			</div>
		);
	}
}
