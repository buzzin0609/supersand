
var Singleton = (function() {

	return class Collisionable {

		constructor() {
			this.quadrants = [];
		}

		detect(object1, object2) {
			return (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
					object1.y < object2.y + object2.height && object1.y + object1.height > object2.y);
		}

		detectSide(main, target) {
			let side = 'all';

			if (main.x + main.width >= target.x) {
				side = 'left';
			}

			if (main.x <= target.x + target.width) {
				side = 'right';
			}

			if (main.y >= target.y + target.height) {
				side = 'up';
			}

			if (main.y + main.height <= target.y) {
				side = 'down';
			}

			return side;

		}

		getSides(main, target, offsetW, offsetH) {
			let sides = [];
			if (main.y > target.y + offsetH) {
				sides.unshift('up');
			}

			if (main.y < target.y - offsetH) {
				sides.unshift('down');
			}

			if (main.x > target.x + offsetW) {
				sides.unshift('left');
			}

			if (main.x < target.x - offsetW) {
				sides.unshift('right');
			}

			return sides;
		}

		detectX(object1, object2) {
			return (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x);
		}

		detectY(object1, object2) {
			return (object1.y < object2.y + object2.height && object1.y + object1.height > object2.y);
		}

	};
}());

export default new Singleton();
