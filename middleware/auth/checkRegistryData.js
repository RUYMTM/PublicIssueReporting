/**
 * Load user from database by the e-mail address (from POST), if it's not exist
 * check password and password confirmation is equals, if everything is ok call next
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};