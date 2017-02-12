import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile';
import slugify from '../utils/slugify';
import Utils from '../utils/utils';

export function handleAttack(attacker, attackee) {
	let amount = attacker.baseHit + (attacker.strength * 0.1);
	attackee.health -= amount;
}

export function incrementAttributes(attributes, incrementers) {
	for (let i = 0, keys = Object.keys(attributes), len = keys.length; i < len; i++) {
		if (incrementers[keys[i]]) {
			let attribute = attributes[keys[i]];
			attribute += attribute * incrementers[keys[i]];
			attributes[keys[i]] = Utils.toFixed(attribute, 3);
		}
	}
	return attributes;
}

let profileActors = {};
export function addProfileCard(actor) {
	let key = slugify(actor.name);
	if (document.getElementsByClassName(`profile-${key}`)[0]) { return; }
	profileActors[key] = actor;
	renderProfileCards();
}

export function removeProfileCard(actor) {
	delete profileActors[slugify(actor.name)];
	renderProfileCards();
}

export function removeProfileCards() {
	profileActors = {};
	renderProfileCards();
}

function renderProfileCards() {
	if (!document.getElementsByClassName('profile-ui')[0]) { return; }
	
	let actors = Object.keys(profileActors).map((a, i) => {
		return <Profile actor={profileActors[a]} key={i} />;
	});
	ReactDOM.render(
		<div>
			{actors}
		</div>,
		document.getElementsByClassName('profile-ui')[0]
	);
}
