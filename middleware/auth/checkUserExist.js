/**
 * Load user from database by the e-mail address (from POST), if it's exist call next
 * The user is saved to res.locals.user
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
