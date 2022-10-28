/**
 * Load a user from the database using the :userid param
 * The result is saved to res.locals.user
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        if(typeof  req.params.userid === "undefined"){
            return next();
        }
        res.locals.user = {
            _id: 0,
            email: 'email',
            lastname: 'Test',
            firstname: 'Test',
            password: 'password'
        };
        res.locals.isItMe = (res.locals.user._id === req.session.userId)
        next();
    };
};
