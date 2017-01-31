import React from 'react';
import Stage1 from './Stage1/Stage1';

const StageList = [
	Stage1
];

class Stages {
	get(num) {
		return StageList[num-1]();
	}
}

export default new Stages();
