import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import Form from '../shared/Form';
import Ajax from '../utils/ajax';
import baseUrl from '../utils/baseUrl';
// import Btn from './Btn';

export default class Login extends SuperComponent {

	constructor(props) {
		super(props);
		this.state = {
			error : false,
			submitText : 'login/register',
			title: 'Login',
			subtitle : 'Type your username and password',
			inputs: [
				{
					type : 'text',
					name : 'username'
				},
				{
					type : 'password',
					name : 'password'
				}
			],
			action: '/handleUser'
		};
		this.postData = {};
		this.cancelSubmit = false;
	}

	componentWillMount() {
		this.cancelSubmit = false;
	}

	async onSubmit(e) {
		e.preventDefault();
		let data = new FormData(e.target);
		let postData = this.postData;
		for (let entry of data.entries()) {
			postData[entry[0]] = entry[1];
		}
		this.setState({
			submitText : 'loading'
		});

		this.beforeSubmit();

		if (this.cancelSubmit) {
			this.afterSubmit();
			return;
		}

		try {
			let response;

			response = JSON.parse(await Ajax.post(
				baseUrl + (e.target.action.replace(location.protocol + '//' + location.host, '')),
				postData
			));

			this.afterSubmit(response);
		} catch (e) {
			console.warn('error in request:', e);
			this.onError(e);
		}


	}

	beforeSubmit() {}
	afterSubmit(response) {}
	onError(e) {
		console.warn(e);
	}

	renderInputs() {
		let inputs = this.state.inputs;
		return inputs && inputs.map(input => {
			return <input type={input.type} name={input.name} placeholder={input.placeholder ? input.placeholder : ''} key={input.name} />
		});
	}

	beforeRender() {}
	beforeInputs() {}
	afterRender() {}

	render() {
		return (
			<Form action={ this.state.action } onSubmit={this.onSubmit.bind(this)}>
				{ this.beforeRender() }
				<h2>{ this.state.title}</h2>
				<p>{ this.state.subtitle }</p>
				{ this.beforeInputs() }
				{ this.state.inputs && this.renderInputs() }
				{
					this.state.submitText &&
					(<input type="submit" value={ this.state.submitText }/>)
				}
				{
					this.state.error &&
					(<p className="message">{ this.state.error }</p>)
				}
				{
					this.state.message &&
					(<p className="message">{ this.state.message }</p>)
				}

				{ this.afterRender() }
			</Form>
		)
	}
}
