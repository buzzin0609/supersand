import React from 'react';
import SuperComponent from '../shared/SuperComponent';

class MainMenu extends SuperComponent {

	render() {
		return (
			<div>
				<h1 className="title">The Legend of the SuperSand Saiyan!</h1>
				<span className="btn" onClick={ this.On.trigger.bind(this, 'setView', 'controls') }>Controls</span>
				<span className="btn" onClick={ this.On.trigger.bind(this, 'setView', 'choose') }>Choose Character</span>
			</div>
		);
	}
}

export default MainMenu;
