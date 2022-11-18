module.exports = function () {
    return function (req, res, next) {
        if(typeof  req.params.token === "undefined"){
            return res.redirect("/");
        }
        const now = new Date();
        if(req.params.token.validity < now){
            return res.redirect("/");
        }
        return next()
    };
};
