import Utils from './utils';

var Debounce = (function() {
	var events = {
		'resize' : [],
		'scroll' : []
	};
	var resizeTimer, scrollTimer;
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			if (events.resize.length) {
				events.resize.forEach(cb => cb.call(cb));
			}
		}, 250);
	});
	window.addEventListener('scroll', function() {
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(function() {
			if (events.scroll.length) {
				events.scroll.forEach(cb => cb.call(cb));
			}
		}, 250);
	});

	class Debounce {
		on(evt, cbs) {
			cbs = Array.isArray(cbs) ? cbs : [cbs];
			events[evt].push.apply(events[evt], cbs);
		}
		off(evt, cbs) {
			cbs = Array.isArray(cbs) ? cbs : [cbs];
			cbs.forEach(cb => {
				let index = events[evt].indexOf(cb);
				events[evt].splice(index, 1);
			});
		}
	}

	return Debounce;
}());

Utils.register('debounce', new Debounce());
