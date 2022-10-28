/**
 * Removes a user from the database, the entity used here is: res.locals.user
 * Redirects to / after delete
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log("delete user userid:" + res.locals.user._id);
        return next();
    };
};