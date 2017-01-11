const mongoose = require('mongoose');
const PlayerSchema = require('./PlayerSchema');
module.exports = mongoose.model('Player', PlayerSchema);
