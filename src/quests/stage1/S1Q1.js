import React from 'react';
import Quest from '../Quest';

let title = 'Welcome';

let description = (
	<div>
		<p>So, you wanna become the legendary Supersand Saiyan, eh? The road to glory is not easy, you're going to face many tough challenges that will push you to the limit.</p>
		<p>First, though, let me see if you've get what it takes!</p>
	</div>
);

let objectives = (
	<li>Defeat all enemies in the training tournament.</li>
);

export default Quest(1, title, description, objectives);