module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof req.session.userId === 'undefined' ){
            return next()
        }
        return res.redirect("/issues")
    };
};
