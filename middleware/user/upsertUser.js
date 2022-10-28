/**
 * Using POST params update or create a user to the database
 * If req.session.userId is there, it's an update otherwise this middleware creates an entity
 * Redirects to redirect to the previous page after success
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        if(typeof res.locals.user === 'undefined'){
            res.locals.error = "undefined"
            return next();
        }
        if(typeof req.session.userId === 'undefined'){
            console.log("user save")
        }
        else{
            console.log("user update")
        }
        return next();
    };
};