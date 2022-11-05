const Schema = require('mongoose').Schema;
const database = require('../config/database');

const Issue = database.model('Issue', {
    description: String,
    location: String,
    status: Boolean,
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Issue;