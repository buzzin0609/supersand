import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import MainMenu from './MainMenu';
import Controls from './Controls';
import Choose from './ChooseCharacter';

// var GameState = require('../shared/GameState');


class Interface extends SuperComponent {
	constructor(props) {
		super(props);

		this.state = {
			view : 'main',
			classes : ''
		};
	}

	componentWillMount() {
		this.addClass(this.state.view);
	}

	setView(name) {
		this.addClass('loading');
		setTimeout(() => {
			this.removeClass([this.state.view, 'loading'].join(' '), () => {
				this.setState({
					view : name
				});
				this.addClass(name);
			});
		}, 350);

	}

	get content() {
		var content;
		switch (this.state.view) {
			case 'main':
				content = (
					<MainMenu setView={ this.setView.bind(this) } />
				);
				break;
			case 'controls':
				content = (
					<Controls setView={ this.setView.bind(this) } />
				);
				break;
			case 'pause':
				content = (
					<div>
						<p>Game Paused</p>
					</div>
				);
				break;
			case 'choose':
				content = (
					<Choose setView={ this.setView.bind(this) }></Choose>
				);
				break;
			default:
				content = (
					<div>No content chosen</div>
				)
		}
		return content;
	}

	render() {
		var content = this.content;

		return (
			<section id="interface" className={ this.state.classes }>
				<div className="overlay"></div>
				{ content }
			</section>
		);
	}
}

export default Interface;
