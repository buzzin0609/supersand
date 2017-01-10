import React from 'react';
import SuperComponent from '../shared/SuperComponent';

export default class Btn extends SuperComponent {

	handleClick() {
		this.On.trigger.call(this, 'setView', this.props.setView);
		if (this.props.clickHandlers) {
			this.props.clickHandlers.forEach(fn => fn());
		}
	}

	render() {
		return <span className="btn" onClick={ this.handleClick.bind(this) }>{ this.props.children }</span>
	}
}
