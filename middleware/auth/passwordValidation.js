/**
* Check the password (from POST), if it's correct, create a session for the user and redirect to /issues
*/

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
