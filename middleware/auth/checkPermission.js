/**
 *  Get user from session and user from the database using the :userid param.
 *  If user has permission (own properties or admin user ) call next, otherwise redirect to the previous page
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        if(typeof  req.params.userid === "undefined"){
            return res.redirect("/issues")
        }
        if(req.params.userid === req.session.userId){
            return res.redirect("/profile/"+req.params.userid)
        }
        return next();
    };
};