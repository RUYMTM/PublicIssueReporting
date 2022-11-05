/**
 * Load all issues from the database
 * The result is saved to res.locals.allIssues
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        const IssueModel = objRepo["IssueModel"]
        IssueModel.find({}, (err, issues) => {
            if (err) {
                return next(err);
            }
            if(!issues){
                res.locals.allIssues = []
                return next()
            }
            res.locals.allIssues = issues
            return next();
        }).populate('_owner');
    };
};
