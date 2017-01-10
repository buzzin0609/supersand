
const Ajax = (function() {
	class Ajax {

		get(url) {

			let request = this;
			request = new XMLHttpRequest();
			request.open('GET', 'http://localhost:3000/' + url, true);

			let response = this.handleRequest(request);
			request.send();
			request = null;
			return response;
		}

		async json(url) {
			let data = await this.get(url);
			return JSON.parse(data);
		}

		post(url, data) {
			let request = new XMLHttpRequest();
			var urlEncodedData = "";
			var urlEncodedDataPairs = [];
			var name;
			for (name in data) {
				if (data.hasOwnProperty(name)) {
					urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
				}
			}
			urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
			let response = this.handleRequest(request);
			request.open('POST', url, true);
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			// request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
			request.send(urlEncodedData);
			return response;
		}

		handleRequest(request) {
			return new Promise((resolve, reject) => {
				request.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status >= 200 && this.status < 400) {
							resolve(this.responseText);
						} else {
							reject(this.responseText);
						}
					}
				};

			});
		}
	}

	return new Ajax();
}());


export default Ajax
