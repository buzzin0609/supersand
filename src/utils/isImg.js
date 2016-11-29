import Utils from './utils';

Utils.register('isImg', function(el) {
	return new Promise(function handleEl(resolve) {
		if (el.src) {
			if (el.complete) {
				resolve(el);
			} else {
				el.addEventListener('load', resolve.bind(null, el));
			}
		} else {
			resolve(el);
		}

	});
});
