import GameState from '../shared/GameState';
import On from '../utils/On';

On.set('level-up', levelUp);

export default function levelUp() {
	let {character} = GameState;
	character.level++;
	character.attributes = character.incrementAttributes(character.attributes);
	character.profileCard.setExp(character.expToLevel, 'remove');
}