import Login from './Login';

export default class BeforeSave extends Login {

	componentWillMount() {
		if (this.state.player) {
			this.On.trigger('setView', 'save');
		}
	}

	afterSubmit(response) {
		super.afterSubmit(response);
		if (response.isNew) {
			this.On.trigger('setView', 'setSecret');
		} else {
			this.On.trigger('setView', 'save');
		}
	}

}
