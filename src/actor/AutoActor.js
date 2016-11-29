var Actor = require('./Actor');


class AutoActor extends Actor {
	constructor(name, args) {
		super(name, args);

	}

	render() {
		super.render().bind(this);
	}
}

module.exports = AutoActor;
