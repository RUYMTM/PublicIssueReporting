/**
 * Using POST params update or create a user to the database
 * If res.locals.user is there, it's an update otherwise this middleware creates an entity
 * Redirects to redirect to the previous page after success
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};