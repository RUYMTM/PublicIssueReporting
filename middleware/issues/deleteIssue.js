/**
 * Removes an issue from the database, the entity used here is: res.locals.issue
 * Redirects to /issues/:userid after delete
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        const IssueModel = objRepo["IssueModel"]
        IssueModel.deleteOne({_id: req.params.issueid}, (err) => {
            if (err) {
                return next(err);
            }
            return next();
        });
    };
};