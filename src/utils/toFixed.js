import Utils from './utils';

Utils.register('toFixed', function(num, decimalPlaces) {
	let places = Math.pow(10, decimalPlaces);
	return Math.floor(num * places) / places;
});
