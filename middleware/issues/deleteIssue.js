/**
 * Removes an issue from the database, the entity used here is: res.locals.issue
 * Redirects to /issues/:userid after delete
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log("delete issue issueid:" + res.locals.issue._id);
        return next();
    };
};