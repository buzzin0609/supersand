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
	<li>Show the old man Roshi that you can beat these worthless chumps.</li>
);

export default Quest(1, title, description, objectives, 100);