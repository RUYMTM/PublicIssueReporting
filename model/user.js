const database = require('../config/database');

const User = database.model('User', {
    email: String,
    lastname: String,
    firstname: String,
    password: String,
});

module.exports = User;