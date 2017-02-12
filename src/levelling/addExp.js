//noinspection JSUnresolvedVariable
import GameState from '../shared/GameState';
import On from '../utils/On';

On.set('enemy-defeated', addExp);
On.set('quest-completed', addExp);

export default function addExp(expValue) {
	let {character} = GameState;
	if (character) {
		character.profileCard.setExp(expValue);
		
	}
}