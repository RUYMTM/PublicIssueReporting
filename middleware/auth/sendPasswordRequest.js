/**
 * Generate temporary password for the user in res.locals.user.
 * Save temporary password in database.
 * Send temporary password to the user's e-mail address.
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.email === 'undefined') {
            return next();
        }
        console.log("password request sent to " + res.locals.email)
        return res.redirect("/?success=password_request")
    };
};
