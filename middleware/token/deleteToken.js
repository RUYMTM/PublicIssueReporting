module.exports = function (objRepo) {
    const TokenModel = objRepo["TokenModel"];
    return function (req, res, next) {
        if (typeof res.locals.error === 'undefined') {

            TokenModel.deleteOne({_id: req.params.tokenid}, (err) => {
                if (err) {
                    return next(err);
                }
                if (req.params.tokenid === req.session.tokenId) {
                    return res.redirect("/?success=password_reset");
                }
            });
        } else {
            return next();
        }
    };
};