function numberArray(len, value) {
	return Array(len).fill(value);
}

function build(ticksArr) {
	let arr = [];
	let i = 0;
	let len = ticksArr.length;
	for (; i < len; i++) {
		arr = arr.concat(numberArray(parseInt(ticksArr[i], 10), i));
	}
	return arr;
}

function buildFrameArray(arr) {
	var newArr = [];
	arr.forEach(str => {
		newArr.push(build(str.split(',')));
	});
	return newArr;
}

module.exports = buildFrameArray;
