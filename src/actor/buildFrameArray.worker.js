function numberArray(len) {
	return Array.from(Array(len).keys());
}

function build(len, ticks) {
	console.log(len, ticks);
	var arr = [];
	for (var i = 0; i < ticks; i++) {
		arr = arr.concat(numberArray(len));
	}
	return arr.sort();
}


onmessage = function(e) {
	console.log('Message received from main script');
	var workerResult = build(e.data[0], e.data[1]);
	console.log('Posting message back to main script');
	postMessage(workerResult);
};
