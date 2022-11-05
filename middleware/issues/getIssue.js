/**
 * Load an issue from the database using the :issueid param
 * The result is saved to res.locals.issue
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        const IssueModel = objRepo["IssueModel"]
        IssueModel.findOne({_id: req.params.issueid}, (err, issue) => {
            if (err || !issue) {
                return next(err);
            }
            res.locals.issue = issue
            return next();
        });
    };
};