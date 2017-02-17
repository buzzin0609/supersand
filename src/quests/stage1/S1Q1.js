import React from 'react';
import Quest, {completed} from '../Quest';
import Quests from '../Quests';
import On from '../../utils/On';
import Goon from '../../actor/Enemy/Goon';


let props = {
	id: 1,
	title: 'Welcome',
	isFinalQuest: true,
	description: (
		<div>
			<p>So, you wanna become the legendary Supersand Saiyan, eh? The road to glory is not easy, you're going to
				face many tough challenges that will push you to the limit.</p>
			<p>First, though, let me see if you've get what it takes!</p>
		</div>
	),
	objectives: (
		<li>Show the old man Roshi that you can beat these worthless chumps.</li>
	),
	finishedContent: (
		<div>
			<p>Well, well, well - it looks like you might be good enough for to be Supersand! Don't get too cocky, though, the real work is about to begin</p>
			
		</div>
	)
};

Quests.add(props);
let quest = Quest(props);

export function stage1quest1() {


	let { goons } = stage1quest1;
	On.set(`${goons[0].name}-unmount`, () => {
		if (goons[0]) {
			let newGoon = goons[0];
			newGoon.clear();
			newGoon.position.x = 300;
			newGoon.startRender();
			stage1quest1(goons);
		} else {
			completed(props.id);
		}
	});


}

let questGoons = function() {
	return [
		Goon(0.5, 0.7, false),
		Goon(0.2, 0.7, false),
		Goon(0.25, 0.7, false)
	];
};

stage1quest1.goons = questGoons();

On.set('clear-game-loop', () => {
	stage1quest1.goons = questGoons();
});

export default quest;