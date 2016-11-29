function numberArray(len, value) {
	return Array(len).fill(value);
}

function build(len, ticksArr) {
	var arr = [];

	var currentLen = ticksArr[0];
	for (var i = 0; i < len; i++) {
		currentLen = ticksArr[i] ? ticksArr[i] : ticksArr[0];
		arr = arr.concat(numberArray(currentLen, i));
	}
	return arr.sort();
}

function buildFrameArray(arr) {
	var newArr = [];
	arr.forEach(str => {
		var args = str.split(',');
		var len = parseInt(args.shift(), 10);
		var ticksArr = args.map(arg => parseInt(arg, 10));
		newArr.push(build(len, ticksArr));
	});
	return newArr;
}

module.exports = buildFrameArray;
