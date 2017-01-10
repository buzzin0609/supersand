
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
				side = 'down';
			}

			if (main.y + main.height <= target.y) {
				side = 'up';
			}

			return side;

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
