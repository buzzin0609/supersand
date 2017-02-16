import React from 'react';
import Goon from '../../actor/Enemy/Goon';
import Stage from '../Stage';
// import { stage1quest1 } from '../../quests/stage1/S1Q1';

class Stage2 extends Stage {
	constructor(props) {
		super(props);

	}

}

export default function() {
	return (
		<Stage2 id="2" enemies={goons} staticActors={[Roshi()]} obstacles={obstacles} quests={[1]} />
	);
}
