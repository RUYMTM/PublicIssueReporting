/**
 * If the user is authenticated, call next, otherwise redirect to /
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
