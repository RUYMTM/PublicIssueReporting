const passwordHash = require('../../config/passwordHash');
module.exports = function () {
    return function (req, res, next) {
        if (typeof res.locals.error === 'undefined') {
            if (typeof res.locals.user !== 'undefined') {
                if (res.locals.password !== "" && typeof res.locals.password !== "undefined") {
                    res.locals.user.password = passwordHash.generate(res.locals.password)
                }
                res.locals.user.save(err => {
                    if (err) {
                        return next(err);
                    }
                    return next()
                });
            }
        } else {
            return next();
        }

    };
};
