import React, {Component} from 'react';
import Btn from '../interface/Btn';
import Quests from './Quests';
import GameState from '../shared/GameState';
import { getExp } from '../levelling/levelUp';


class Quest extends Component {
	
	constructor(props) {
		super(props);
		this.id = props.id;

	}

	render() {
		return (
			<div className="quest__body">
				<h2 className="title">New Quest</h2>
				<p className="tagline quest__title">{this.props.title ? this.props.title : '' }</p>
				<div className="quest__description">
					{this.props.description}
				</div>
				<div className="quest__objectives">
					<h3 className="quest__title title--objectives">Objectives</h3>
					<ul>
						{this.props.objectives}
					</ul>
				</div>
				<p className="quest__reward">Exp Reward: {Math.round(getExp(GameState.character.level)/10)}</p>
				<Btn setView="game">Continue</Btn>
			</div>
		);

	}
}

export default function(id, title, description, objectives, expReward) {
	let quest = <Quest id={id} title={title} description={description} objectives={objectives} expReward={expReward} />;
	Quests.add(quest);
	return quest;
}