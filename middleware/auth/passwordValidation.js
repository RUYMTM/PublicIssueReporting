/**
 * Check the password (from POST), if it's correct, create a session for the user and redirect to /issues
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof req.body.email === 'undefined' ||
            typeof req.body.password === 'undefined' ||
            req.body.email === "" ||
            req.body.password === ""
        ) {
            return next();
        }
        if (req.body.email === "email" && req.body.password === "password") {
            req.session.userId = 0;
            return req.session.save(err => res.redirect('/issues'));
        }

        res.locals.error = 'Hibás email cím vagy jelszó!';
        return next();
    };
};
