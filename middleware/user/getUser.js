/**
 * Load a user from the database using the :userid param
 * The result is saved to res.locals.user
 */
module.exports = function (objRepo) {
    const UserModel = objRepo["UserModel"]
    return function (req, res, next) {
        if(typeof  req.params.userid === "undefined"){
            return next();
        }
        UserModel.findOne({ _id: req.params.userid }, (err, user) => {
            if (err || !user) {
                return next(err);
            }
            res.locals.user = user;
            res.locals.isItMe = (res.locals.user._id.toString() === req.session.userId)
            return next();
        });
    };
};
