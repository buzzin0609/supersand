import React from 'react';
import Quest from './Quest';

const Quests = {
	items : {},
	add : function(args) {
		if (!this.items[args.id]) {
			this.items[args.id] = args;
		}
	},
	get : function(num, isCompleted) {
		let args = this.items[num];
		if (isCompleted) {
			args.completed = true;
		}
		return <Quest {...args} />;

	}
};

export default Quests;

require('./stage1/S1Q1');