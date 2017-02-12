import React from 'react';
import SuperComponent from '../shared/SuperComponent';
import GameLoop from '../gameloop/GameLoop';
import GameState from '../shared/GameState';

import Quests from './Quests';

export default class extends SuperComponent {
	
	constructor(props) {
		super(props);
		
		this.state = {
			quest: GameState.get('quest') || 1
		};

		GameState.set('quest', this.state.quest);
		GameState.set('updateQuest', this.updateQuest.bind(this));
	}

	componentWillMount() {
		GameLoop.stop.call(GameLoop);
	}

	componentWillUnmount() {
		GameLoop.start.call(GameLoop);
	}
	
	updateQuest(num) {
		this.setState({
			quest: num
		});
		GameState.set('quest', num);
	}

	render() {
		return (
			<div className="quest-interface">
				{Quests.get(this.state.quest)}
			</div>
		)
	}
}
