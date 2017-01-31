import React from 'react';
import Goon from '../../actor/Enemy/Goon';
import obstacles from './obstaclesS1';
import Stage from '../Stage';

export default function() {
	return (
		<Stage enemies={[Goon(0.5, 0.7, false)]} obstacles={obstacles} />
	);
}
