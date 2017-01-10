import PostForm from './PostForm';

export default class ForgotPassword extends PostForm {
	constructor(props) {
		super(props);
		Object.assign(this.state, {
			submitText : 'get secret',
			title : 'Forgot password',
			subtitle : 'Type your username to get your secret question',
			inputs : [
				{
					type : 'text',
					name : 'username'
				}
			],
			action : '/getSecret',
			stage : 1
		});
		this.username = false;

	}


	afterSubmit(response) {
		console.log(response);
		this.username = this.postData.username;
		if (this.state.stage === 1) {
			this.setState({
				error: false,
				submitText : 'get password',
				subtitle : `Secret Question: ${response.question}`,
				inputs : [
					{
						type : 'text',
						name : 'answer'
					}
				],
				action : '/getPassword',
				stage : 2
			});

		} else {
			this.setState({
				submitText : false,
				subtitle : `Your password: ${response}`,
				inputs : false
			});
		}
	}

	onError(e) {
		super.onError(e);
		this.setState({
			error : 'Player not found, please try again',
			submitText : 'get secret'
		});
	}


}
