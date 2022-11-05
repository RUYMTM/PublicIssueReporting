/**
 * Load user from database by the e-mail address (from POST), if it's exist call next
 * The user is saved to res.locals.user
 */

const passwordHash = require("../../config/passwordHash");
module.exports = function (objRepo) {
    return function (req, res, next) {
        const UserModel = objRepo["UserModel"]
        if (typeof req.body.email === 'undefined'){
            return next();
        }

        UserModel.findOne({ email: req.body.email }, (err, user) => {
            if (err || !user) {
                res.locals.error = "Nem létezik felhasználó a megadott e-mail címmel!"
                return next(err);
            }
            res.locals.email = req.body.email;
            return next();
        });
    };
};
