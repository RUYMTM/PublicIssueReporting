/**
 * Removes a user from the database, the entity used here is: res.locals.user
 * Redirects to / after delete
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        const UserModel = objRepo["UserModel"]
        const IssueModel = objRepo["IssueModel"]
        IssueModel.deleteMany({_owner: req.params.userid}, (err) => {
            if (err) {
                return next(err);
            }
        });
        UserModel.deleteOne({_id: req.params.userid}, (err) => {
            if (err) {
                return next(err);
            }
            if(req.params.userid === req.session.userId){
                return next();
            } else {
                return res.redirect("/");
            }

        });
    };
};