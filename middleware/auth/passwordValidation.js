/**
 * Check the password (from POST), if it's correct, create a session for the user and redirect to /issues
 */
const passwordHash = require('../../config/passwordHash');
module.exports = function (objRepo) {
    return function (req, res, next) {
        const UserModel = objRepo["UserModel"]
        if (typeof req.body.email === 'undefined' ||
            typeof req.body.password === 'undefined' ||
            req.body.email === "" ||
            req.body.password === ""
        ) {
            return next();
        }

        UserModel.findOne({ email: req.body.email }, (err, user) => {
            if (err || !user) {
                res.locals.error = 'Hibás email cím vagy jelszó!';
                return next(err);
            }
            if (passwordHash.verify(req.body.password, user.password)) {
                req.session.userId = user._id;
                req.session.isAdmin= user.email === "admin";
                return req.session.save(err => res.redirect('/issues'));
            }

            res.locals.error = 'Hibás email cím vagy jelszó!';
            return next();
        });
    };
};
