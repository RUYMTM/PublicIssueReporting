/**
 * Load all issues of user from the database using the :userid param
 * The result is saved to res.locals.issues
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        const IssueModel = objRepo["IssueModel"]
        let page;
        if (typeof req.query.page === 'undefined') {
            page = 1
        } else {
            page = parseInt(req.query.page)
        }
        res.locals.page = page
        IssueModel.find({_owner: res.locals.user._id}, (err, issues) => {
            if (err) {
                return next(err);
            }
            if(!issues){
                res.locals.issues = []
                return next()
            }
            res.locals.issues = issues
            res.locals.issuesOnPage = issues.slice((page-1)*15, page*15)
            return next();
        })
            .sort({_owner: 1,description: 1, location: 1, status: 1});
    };
};