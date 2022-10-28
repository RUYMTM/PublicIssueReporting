/**
 * If the user is authenticated, call next, otherwise redirect to /
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof req.session.userId === 'undefined' ){
            return res.redirect("/")
        }
        return next()
    };
};

