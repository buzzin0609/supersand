
const app = require('../index');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const PlayerModel = require('../db/players/PlayerModel');
const Player = require('../db/players/Player');

app.use(bodyParser.json());

var urlEncode = bodyParser.urlencoded({ extended: true });

// Add headers
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Pass to next layer of middleware
	next();
});

app.post('/handleUser', urlEncode, async (function(req, res) {

	let body = req.body;
	if (!req.body || !req.body.password) {
		res.end('No password sent');
		return;
	}
	let player = await (PlayerModel.find({ username : body.username }));
	let isNew = 0;
	if (!player.length) {
		isNew = 1;
		// console.log('player not found', body);
		let newPlayer = new Player({
			username: body.username.trim(),
			password: body.password.trim()
		});
		player = await (newPlayer.ready);
	} else {
		[player] = player;
		if (player.password !== body.password) {
			res.status(500).end('incorrect password');
			return;
		}
	}

	res.json({
		player : player,
		isNew : isNew
	});
	// let form = new multiparty.Form();
	// form.parse(req, async (function(err, fields, files) {
	// }));
}));

app.post('/setSecret', urlEncode, async (function(req, res) {
	let { body } = req;

	if (!body || !body.question || !body.answer || !body.playerId) {
		res.end('No or incomplete secret sent');
		return;
	}

	let update = {
		secret : {
			question : body.question,
			answer : body.answer
		}
	};

	let player = await (PlayerModel.update({ _id : body.playerId }, update));

	res.json({});
}));

app.post('/getSecret|getPassword', urlEncode, async (function(req, res) {
	let { body } = req;

	if (!body || !body.username) {
		res.status(400).end('No username sent');
		return;
	}

	let player = await (PlayerModel.findOne({ username : body.username }));

	if (!player) {
		res.status(404).end('Player not found, try again');
	}

	let response;

	if (/secret/i.test(req.path)) {
		response = player.secret;
	} else {
		response = player.password;
	}

	res.json(response);
}));

app.post('/saveGame|updateGame', urlEncode, async (function(req, res) {
	let { body } = req;

	if (!body || !body.playerId || !body.game) {
		res.status(400).end('No player or game sent');
	}

	let game = JSON.parse(body.game);
	let player = await (PlayerModel.findOne({ _id : body.playerId }));

	if (/save/i.test(req.path)) {
		if (player.games.includes(game)) {
			res.status(403).end('Save failed. Game already exists');
			return;
		}
		player.games.push(game);
	} else if (/update/i.test(req.path)) {
		player.games = player.games.map(oldGame => {
			if (game.saveName === oldGame.saveName) {
				console.log('updating game', game, oldGame);
				return game;
			}
			return oldGame;
		});
	}


	res.json(await (player.save()));
}));
