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
            setHealth: this.setHealth.bind(this)
        };
        this.state = {
            startHp: startHp,
            health: this.calculateHealthPercentage(health, startHp),
            ki: 0,
            exp: 0
        };
    }

    setTransform(value) {
        return {
            transform: `translateX(${value}%)`
        };
    }

    calculateHealthPercentage(amount, max) {
        return Math.ceil((amount / max) * 100);
    }

    setHealth(amount, addRemove = 'remove') {
        let {startHp, health} = this.state;
        let percentToChange = this.calculateHealthPercentage(amount, startHp);
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
        let {actor} = this.props;
        let key = slugify(actor.name);
        return (
            <div className={`profile-ui__actor profile-${key} ${actor.type ? actor.type : ''}`}>
                <img className="profile__img" src={ `img/${actor.profilePic}` } alt={ actor.name }/>
                <div className="health-bar profile__bar">
                    <div className="health-bar__inner bar__inner"
                         style={this.setTransform(this.state.health)}></div>
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
