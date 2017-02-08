import React from 'react';
import SuperComponent from '../shared/SuperComponent';



export default class Profile extends SuperComponent {

	constructor(props) {
		super(props);

		let { actor } = this.props;
		let { health } = actor.attributes;

		actor.profileCard = {
			setHealth : this.setHealth.bind(this)
		};

		this.state = {
			startHp: health,
			health: 100,
			ki: 0,
			exp: 0
		};
	}

	setTransform(value) {
		return {
			transform: `translateX(${value}%)`
		};
	}

	setHealth(amount, addRemove = 'remove') {
		let { startHp, health } = this.state;
		let percentToChange = (amount / startHp) * 100;
		if (addRemove === 'remove') {
			health = Math.max(0, health - percentToChange);
		} else {
			health = Math.min(100, health + percentToChange);
		}
		this.setState({
			health: health
		});

	}

	render() {
		let { actor } = this.props;
		let key = actor.name.replace(/\s/, '-').toLowerCase();
		return (
			<div className={`profile-ui__actor profile-${key}`}>
				<img className="profile__img" src={ `img/${actor.profilePic}` } alt={ actor.name } />
				<div className="health-bar profile__bar">
					<div className="health-bar__inner bar__inner" style={this.setTransform(this.state.health)}></div>
				</div>
				<div className="ki-bar profile__bar">
					<div className="ki-bar__inner bar__inner"></div>
				</div>
				<div className="exp-bar profile__bar">
					<div className="exp-bar__inner bar__inner"></div>
				</div>
			</div>
		);
	}
}
