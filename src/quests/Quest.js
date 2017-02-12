import React, {Component} from 'react';
import Btn from '../interface/Btn';
import Quests from './Quests';


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
				<ul className="quest__objectives">
					<h3 className="quest__title title--objectives">Objectives</h3>
					{this.props.objectives}
				</ul>
				<Btn setView="game">Accept Quest</Btn>
			</div>
		);

	}
}

export default function(id, title, description, objectives) {
	let quest = <Quest id={id} title={title} description={description} objectives={objectives} />;
	Quests.add(quest);
	return quest;
}