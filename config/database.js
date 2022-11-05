const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/public_issue_reporting');
module.exports = mongoose;