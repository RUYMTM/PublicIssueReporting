/**
 * Load all issues of user from the database using the :userid param
 * The result is saved to res.locals.issues
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        const IssueModel = objRepo["IssueModel"]
        IssueModel.find({_owner: res.locals.user._id}, (err, issues) => {
            if (err) {
                return next(err);
            }
            if(!issues){
                res.locals.issues = []
                return next()
            }
            res.locals.issues = issues
            return next();
        });
    };
};