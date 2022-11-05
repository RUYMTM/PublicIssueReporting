module.exports = function () {
    return function (req, res, next) {
        if (typeof req.query.success !== 'undefined' && req.query.success === "registry"){
            res.locals.message = "Sikeres regisztráció!"
        }
        if (typeof req.query.success !== 'undefined' && req.query.success === "password_request"){
            res.locals.message = "Sikeres jelszó ígénylés!"
        }
        next();
    };
};
