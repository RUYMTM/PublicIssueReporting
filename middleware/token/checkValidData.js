module.exports = function () {
    return function (req, res, next) {
        if (typeof req.body.password === 'undefined' ||
            typeof req.body.passwordConfirmation === 'undefined' ||
            req.body.password === '' ||
            req.body.passwordConfirmation === ''
        ) {
            res.locals.error = 'Az össze adatot ki kell tölteni!';
            return next();
        }
        if (req.body.password !== req.body.passwordConfirmation) {
            res.locals.error = 'A jelszónak és a jelszó megerősítésnek meg kell egyeznie!';
            return next();
        }
        res.locals.password = req.body.password;
        return next();
    };
};