/**
 * Load user from database by the e-mail address (from POST), if it's exist call next
 * The user is saved to res.locals.user
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.body.email === 'undefined'){
            return next();
        }
        if (req.body.email !== 'email'){
            res.locals.error = "Nem létezik felhasználó a megadott e-mail címmel!"
            return next();
        }
        res.locals.email = req.body.email;
        return next();
    };
};
