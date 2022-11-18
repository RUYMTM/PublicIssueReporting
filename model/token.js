const Schema = require('mongoose').Schema;
const database = require('../config/database');

const Token = database.model('Token', {
    token: String,
    validity: Date,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Token;