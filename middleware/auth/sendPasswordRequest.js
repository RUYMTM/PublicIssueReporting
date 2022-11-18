module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }
        const TokenModel = objRepo["TokenModel"]
        const token = new TokenModel()

        token.token = (Math.random()).toString(36).substring(7) + (Math.random() + 1).toString(36);
        token.validity = new Date().setHours(new Date().getHours() + 1);
        token._user = res.locals.user._id
        token.save(err => {
            if (err) {
                return next(err);
            }
            console.log("password request sent to " + res.locals.user.email)
            console.log("Jelszó visszaállítás igénylés történt az ön email címével. Amennyiben nem ön ígényelte kérem hagyja figyelmen kívül!")
            console.log("Amennyiben ön kérvényezett jelszóvisszaállítást, a következő címen végezheti el:")
            console.log("http://localhost:3000/password_reset/" + res.locals.user._id + "/" + token.token)
            return res.redirect("/?success=password_request");
        });

    };
};
