import React from 'react';
import SuperComponent from '../shared/SuperComponent';

export default class Btn extends SuperComponent {

	handleClick() {
		if (this.props.setView) {
			this.On.trigger.call(this, 'setView', this.props.setView);
		}
		if (this.props.clickHandlers) {
			this.props.clickHandlers.forEach(fn => fn());
		}
	}

	render() {
		if ('ontouchstart' in document.documentElement) {
			return <span className="btn" onTouch={ this.handleClick.bind(this) }>{ this.props.children }</span>
		}
		return <span className="btn" onClick={ this.handleClick.bind(this) }>{ this.props.children }</span>
	}
}
