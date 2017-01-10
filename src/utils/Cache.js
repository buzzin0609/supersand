
class CacheClass {
	get(item) {
		let cached = sessionStorage.getItem(item);
		if (cached) {
			return JSON.parse(cached);
		}
		return false;
	}

	set(item, value) {
		sessionStorage.setItem(item, JSON.stringify(value));
	}
}

const Cache = new CacheClass();

export default Cache;
