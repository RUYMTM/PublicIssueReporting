/**
 * Using POST params update or create a user to the database
 * If req.session.userId is there, it's an update otherwise this middleware creates an entity
 * Redirects to redirect to the previous page after success
 */
const passwordHash = require('../../config/passwordHash');
module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof res.locals.error === 'undefined') {
            const UserModel = objRepo["UserModel"]

            if (typeof res.locals.user === 'undefined') {
                res.locals.user = new UserModel()

                res.locals.user.email = res.locals.email
                res.locals.user.lastname = res.locals.lastname
                res.locals.user.firstname = res.locals.firstname
                res.locals.user.password = passwordHash.generate(res.locals.password)

                res.locals.user.save(err => {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect("/?success=registry")
                });
            } else {
                res.locals.user.email = res.locals.email
                res.locals.user.lastname = res.locals.lastname
                res.locals.user.firstname = res.locals.firstname
                if(res.locals.password !== "" && typeof res.locals.password !== "undefined"){
                    res.locals.user.password = passwordHash.generate(res.locals.password)
                }
                res.locals.user.save(err => {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect("/profile/"+req.session.userId);
                });
            }
        } else {
            return next();
        }

    };
};