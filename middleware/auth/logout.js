module.exports = function (objRepo) {
    return function (req, res) {
        req.session.userId = undefined;
        return res.redirect("/")
    };
};
