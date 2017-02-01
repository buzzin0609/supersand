import React from 'react';
import Goon from '../../actor/Enemy/Goon';
import Roshi from '../../actor/RandomCharacters/Roshi'
import obstacles from './obstaclesS1';
import Stage from '../Stage';

export default function() {
	return (
		<Stage id="1" enemies={[Goon(0.5, 0.7, false)]} staticActors={[Roshi()]} obstacles={obstacles} />
	);
}
