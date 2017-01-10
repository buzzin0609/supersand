import Utils from './utils';

Utils.register('arrayFindOne', function(haystack, needle) {
	return needle.some(item => haystack.includes(item));
});
