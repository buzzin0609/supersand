import GameState from '../shared/GameState';
import On from '../utils/On';

On.set('level-up', levelUp);

// exp += 10 * level * Math.log10(level + 1);
function baseExp(level) {
	return 45 + (8 * level);
}

export function mobXp(level) {
	return (45 * (GameState.get('stage') || 1)) + (5 * level);
}

function logFn(level) {
	return Math.min(level * Math.log10(level + 1), 1);
}

export function getExp(level) {
	return Math.round(baseExp(level) * mobXp(level) * logFn(level));
}

export default function levelUp() {
	let {character} = GameState;
	character.level++;
	character.attributes.expToLevel = getExp(character.level);

	console.log(character.attributes.expToLevel);
	character.attributes = character.incrementAttributes(character.attributes);
	// character.profileCard.setExp(character.expToLevel, 'remove');
}

