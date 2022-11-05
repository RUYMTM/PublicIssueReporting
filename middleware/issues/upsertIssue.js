/**
 * Using POST params update or create an issue to the database
 * If res.locals.issue is there, it's an update otherwise this middleware creates an entity
 * Redirects to redirect to the previous page after success
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        const IssueModel = objRepo["IssueModel"]
        if (typeof req.body.description === 'undefined' ||
            typeof req.body.location === 'undefined' ||
            req.body.description === '' ||
            req.body.location === ''
        ) {
            return next();
        }


        if (typeof res.locals.issue === 'undefined') {
            let issue = new IssueModel()

            issue.description = req.body.description
            issue.location = req.body.location
            issue.status = false
            issue._owner = req.session.userId

            issue.save(err => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        } else {
            res.locals.issue.description = req.body.description
            res.locals.issue.location = req.body.location
            res.locals.issue.status = req.body.status === "on"

            res.locals.issue.save(err => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        }
        return next();
    };
};