
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
			if (main.x + main.width < target.x) {
				return 'left';
			}
			if (main.x > target.x + target.width) {
				return 'right';
			}

			if (main.y > target.y + target.height) {
				return 'down';
			}
			if (main.y + main.height < target.y) {
				return 'up';
			}

			return 'all';

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
