import React from 'react';
import Roshi from '../../actor/RandomCharacters/Roshi'
import obstacles from './obstaclesS1';
import Stage from '../Stage';
import { stage1quest1 } from '../../quests/stage1/S1Q1';


class Stage1 extends Stage {
	constructor(props) {
		super(props);
		stage1quest1();
		
	}

}

export default function() {
	return (
		<Stage1 id="1" enemies={stage1quest1.goons} staticActors={[Roshi()]} obstacles={obstacles} quests={[1]} />
	);
}
