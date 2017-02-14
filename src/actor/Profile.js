import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import slugify from '../utils/slugify';


export default class Profile extends SuperComponent {

    constructor(props) {
        super(props);
        let {actor} = this.props;
        let {health} = actor.attributes;
        let {startHp} = actor.attributes;

        actor.profileCard = {
            setHealth: this.setHealth.bind(this),
			setKi: this.setKi.bind(this),
			setExp: this.setExp.bind(this)
        };

        this.state = {
            startHp: startHp,
            health: health,
			maxKi: actor.attributes.maxKi || 50,
            ki: 0,
			expToLevel: actor.attributes.expToLevel || 200,
			exp : actor.exp || 0
        };

    }

    setTransform(value) {
        return {
            transform: `translateX(${value}%)`
        };
    }

    calculatePercentage(amount, max) {
        return Math.ceil((amount / max) * 100);
    }

    setHealth(amount, addRemove = 'remove') {
        let {startHp, health} = this.state;

		this.setBarValue('health', amount, health, startHp, addRemove);

    }

	setKi(amount, addRemove = 'add') {
		let {maxKi, ki} = this.state;

		this.setBarValue('ki', amount, ki, maxKi, addRemove);
	}

	setExp(amount, addRemove = 'add') {
		let {expToLevel, exp} = this.state;

		this.setBarValue('exp', amount, exp, expToLevel, addRemove);
	}

	setBarValue(prop, amount, stateValue, max, addRemove) {

		if (addRemove === 'remove') {
			stateValue = Math.max(0, stateValue - amount);
		} else {
			stateValue = Math.min(max, stateValue + amount);
		}

		let newState = {};
		newState[prop] = stateValue;

		this.setState(newState);
	}


    render() {
        let {actor} = this.props;
        let key = slugify(actor.name);
        return (
            <div className={`profile-ui__actor profile-${key} ${actor.type ? actor.type : ''}`}>
                <img className="profile__img" src={ `img/${actor.profilePic}` } alt={ actor.name } />
                <div className="health-bar profile__bar">
                    <div className="health-bar__inner bar__inner"
                         style={this.setTransform(this.calculatePercentage(this.state.health, this.state.startHp))}>
					</div>
					<span>Health: {this.state.health}/{this.state.startHp}</span>
                </div>
                <div className="ki-bar profile__bar">
                    <div className="ki-bar__inner bar__inner"
						 style={this.setTransform(this.calculatePercentage(this.state.ki, this.state.maxKi))}></div>
					<span>Ki: {this.state.ki}/{this.state.maxKi}</span>
                </div>
                <div className="exp-bar profile__bar">
                    <div className="exp-bar__inner bar__inner"
						 style={this.setTransform(this.calculatePercentage(this.state.exp, this.state.expToLevel))}></div>
					<span>Exp: {this.state.exp}/{this.state.expToLevel}</span>
                </div>
            </div>
        );
    }
}
