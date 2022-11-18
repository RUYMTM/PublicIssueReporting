module.exports = function (objRepo) {
    const TokenModel = objRepo["TokenModel"]
    return function (req, res, next) {
        if(typeof  req.params.tokenid === "undefined"){
            return next();
        }
        TokenModel.findOne({ _id: req.params.tokenid }, (err, token) => {
            if (err || !token) {
                return next(err);
            }
            res.locals.token = token;
            return next();
        });
    };
};
