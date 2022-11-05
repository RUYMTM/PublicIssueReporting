module.exports = function () {
    return function (req, res) {
        req.session.userId = undefined;
        return res.redirect("/")
    };
};
