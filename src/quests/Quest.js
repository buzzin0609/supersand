import React, {Component} from 'react';
import Btn from '../interface/Btn';
import {questExp} from '../levelling/levelUp'
import On from '../utils/On';
import GameState from '../shared/GameState';


class Quest extends Component {

	constructor(props) {
		super(props);
		this.id = props.id;
		this.completed = props.completed || false;
	}


	questStart() {
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
				<p className="quest__reward">Exp Reward: { questExp() }</p>
				<Btn setView="game">Start</Btn>

			</div>
		);
	}

	questFinish() {

		return (
			<div className="quest__body">
				<h2 className="title">Quest Completed</h2>
				{ this.props.finishedContent }
				{ this.props.isFinalQuest ?
					<Btn clickHandlers={[this.nextStage.bind(this)]} setView="stageStart">Start next stage</Btn> :
					<Btn setView="game">Continue</Btn>
				}
			</div>

		)
	}

	nextStage() {
		On.trigger('next-stage');
	}

	render() {
		return this.props.completed ? this.questFinish() : this.questStart();
	}
}

export function completed(id = false) {
	On.trigger('quest-completed', questExp());
	if (id) {
		On.trigger(`quest-${id}-completed`);
	}
	GameState.get('setView')('quest-complete');
}

export default function (args) {

	let quest = <Quest {...args} />;
	return quest;
}