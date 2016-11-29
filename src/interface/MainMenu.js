import React from 'react';
import SuperComponent from '../shared/SuperComponent';

class MainMenu extends SuperComponent {

	render() {
		return (
			<div>
				<h1 className="title">The Legend of the SuperSand Saiyan!</h1>
				<span className="btn" onClick={ this.props.setView.bind(this, 'controls') }>Controls</span>
				<span className="btn" onClick={ this.props.setView.bind(this, 'choose') }>Choose Character</span>
			</div>
		);
	}
}

export default MainMenu;
