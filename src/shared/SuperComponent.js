import { Component } from 'react';

class SuperComponent extends Component {

	addClass(str, cb) {
		var current = this.state.classes;
		if (current) {
			current += ' ' + str;
		} else {
			current = str;
		}
		this.setState({
			classes : current
		}, cb);
	}

	removeClass(str, cb) {
		var current = this.state.classes.split(' ');
		str.split(' ').forEach(cls => {
			if (current.includes(cls)) {
				current.splice(current.indexOf(cls), 1);
			}
		});
		this.setState({
			classes : current.join(' ')
		}, cb);
	}
}

export default SuperComponent;
