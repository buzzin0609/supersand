import React from 'react';
import SuperComponent from './SuperComponent';

export default class Form extends SuperComponent {
	render() {
		return (
			<form {...this.props}>
				{ this.props.children }
			</form>
		)
	}
}
