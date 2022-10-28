/**
 * Load user from database by the e-mail address (from POST), if it's not exist
 * check password and password confirmation is equals, if everything is ok call next
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof req.body.email === 'undefined' ||
            typeof req.body.lastname === 'undefined' ||
            typeof req.body.firstname === 'undefined' ||
            typeof req.body.password === 'undefined' ||
            typeof req.body.passwordConfirmation === 'undefined' ||
            req.body.email === '' ||
            req.body.lastname === '' ||
            req.body.firstname === '' ||
            req.body.password === '' ||
            req.body.passwordConfirmation === ''
        ) {
            return next();
        }
        if (req.body.password !== req.body.passwordConfirmation) {
            res.locals.error = 'A jelszónak és a jelszó megerősítésnek meg kell egyeznie!';
            return next();
        }

        if (req.body.email === 'email' ) {
            res.locals.error = 'Ezzel az e-mail címmel már létezik felhasználó!';
            return next();
        }

        res.locals.user = {
            email: req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password: req.body.password
        }
        return next();
    };
};