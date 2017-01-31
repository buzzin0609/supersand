import PostForm from './PostForm';
import GameState from '../shared/GameState';

export default class SetSecret extends PostForm {

	constructor(props) {
		super(props);
		Object.assign(this.state, {
			error : false,
			submitText : 'set secret',
			title: 'Thanks for registering',
			subtitle : 'Add a secret question and answer to use if you forget your password',
			inputs: [
				{
					type : 'text',
					name : 'question'
				},
				{
					type : 'text',
					name : 'answer'
				}
			],
			action: '/setSecret'
		});

	}

	beforeSubmit() {
		// console.log(GameState.get('player'));
		this.postData.playerId = GameState.get('player')._id;
	}

	afterSubmit(response) {
		// console.log(response);
		if (GameState.hasStarted) {
			this.On.trigger('setView', 'save');
		} else {
			this.On.trigger('setView', 'choose');
		}

	}

	onError(e) {
		super.onError(e);
		this.setState({
			'submitText' : 'set secret',
			'error' : 'There was an error setting your secret, please try again'
		});
	}


}
