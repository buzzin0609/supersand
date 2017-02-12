import React from 'react';
import Quest from '../Quest';

let title = 'Welcome';

let description = (
	<div>
		<p>So, you wanna become the legendary Supersand Saiyan, eh? The road to glory is not easy, you're going to face many tough challenges that will push you to the limit.</p>
		<p>To become a Supersand Saiyan, you need to win all the regional Supersand Saiyan tournaments before you get a shot at the current Supersand Saiyan.</p>
		<p>First, though, let me show you how to fight!</p>
	</div>
);

let objectives = (
	<li>Defeat all enemies in the training tournament.</li>
);

export default Quest(1, title, description, objectives);