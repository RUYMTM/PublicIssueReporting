/**
 * If the user is authenticated, call next, otherwise redirect to /
 */

module.exports = function () {
    return function (req, res, next) {
        if (typeof req.session.userId === 'undefined' ){
            return res.redirect("/")
        }
        res.locals.isAdmin = req.session.isAdmin;
        return next()
    };
};

