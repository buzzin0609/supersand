//noinspection JSUnresolvedVariable
import GameState from '../shared/GameState';
import On from '../utils/On';

On.set('enemy-defeated', addExp);
On.set('quest-completed', addExp);

export default function addExp(expValue) {
	let {character} = GameState;
	if (character) {
		if (Math.min(character.exp += expValue, character.expToLevel) === character.expToLevel) {
			On.trigger('level-up');
		}
		character.profileCard.setExp(expValue);
		
	}
}