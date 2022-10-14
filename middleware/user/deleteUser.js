/**
 * Removes a user from the database, the entity used here is: res.locals.user
 * Redirects to / after delete
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};