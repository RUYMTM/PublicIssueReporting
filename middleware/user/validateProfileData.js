module.exports = function (objRepo) {
    return function (req, res, next) {
        const UserModel = objRepo["UserModel"]
        if (typeof req.body.email === 'undefined' ||
            typeof req.body.lastname === 'undefined' ||
            typeof req.body.firstname === 'undefined' ||
            req.body.email === '' ||
            req.body.lastname === '' ||
            req.body.firstname === ''
        ) {
            res.locals.error = 'Egyik adat sem lehet üres!';
            return next();
        }
        if (req.body.password !== req.body.passwordConfirmation) {
            res.locals.error = 'A jelszónak és a jelszó megerősítésnek meg kell egyeznie!';
            return next();
        }

        UserModel.findOne({email: req.body.email, _id: { $ne: req.params.userid } }, (err, user) => {
            if (err || user) {
                res.locals.error = 'Ezzel az e-mail címmel már létezik felhasználó!';
                return next();
            } else {
                res.locals.email = req.body.email
                res.locals.lastname = req.body.lastname
                res.locals.firstname = req.body.firstname
                res.locals.password = req.body.password
                return next();
            }

        });
    };
};