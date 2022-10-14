/**
 *  Get user from session and user from the database using the :userid param.
 *  If user has permission (own properties or admin user ) call next, otherwise redirect to the previous page
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};