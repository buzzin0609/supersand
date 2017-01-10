import Login from './Login';

export default class NewGame extends Login {

	componentWillMount() {
		if (this.state.player) {
			this.On.trigger('setView', 'choose');
		}
	}

	afterSubmit(response) {
		super.afterSubmit(response);
		if (response.isNew) {
			this.On.trigger('setView', 'setSecret');
		} else {
			this.On.trigger('setView', 'choose');
		}
	}

}
