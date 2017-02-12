import React from 'react';
import Goon from '../../actor/Enemy/Goon';
import Roshi from '../../actor/RandomCharacters/Roshi'
import obstacles from './obstaclesS1';
import Stage from '../Stage';
import On from '../../utils/On';

let goons = [
	Goon(0.5, 0.7, false),
	Goon(0.2, 0.7, false),
	Goon(0.25, 0.7, false)
];

class Stage1 extends Stage {
	constructor(props) {
		super(props);
		this.setNextGoon();
	}

	setNextGoon() {

		On.set(`${goons[0].name}-unmount`, () => {
			if (goons[0]) {
				let newGoon = goons[0];
				newGoon.clear();
				newGoon.position.x = 300;
				this.setNextGoon();
			} else {
				alert('Quest completed');
			}
		});
	}
}

export default function() {


	return (
		<Stage1 id="1" enemies={goons} staticActors={[Roshi()]} obstacles={obstacles} quests={[1]} />
	);
}
