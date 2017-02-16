//noinspection JSUnresolvedVariable
import GameState from '../shared/GameState';
import On from '../utils/On';

On.set('enemy-defeated', addExp);
On.set('quest-completed', addExp);

export default function addExp(expValue) {
	let {character} = GameState;
	if (character) {
		character.attributes.exp = Math.min(character.attributes.exp + expValue, character.attributes.expToLevel);
		if (character.attributes.exp === character.attributes.expToLevel) {
			On.trigger('level-up');
		}
		character.profileCard.setExp(expValue);
		
	}
}