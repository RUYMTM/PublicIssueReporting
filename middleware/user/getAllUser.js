/**
 * Load all user from the database
 * The result is saved to res.locals.users
 */

module.exports = function (objRepo) {
    return function (req, res, next) {
        const IssueModel = objRepo["IssueModel"]
        const UserModel = objRepo["UserModel"]

        let page;
        if (typeof req.query.page === 'undefined') {
            page = 1
        } else {
            page = parseInt(req.query.page)
        }
        res.locals.page = page
        UserModel.find({}, (err, users) => {
            if (err) {
                return next(err);
            }
            if (!users) {
                res.locals.users = []
                return next()
            }

            IssueModel.find({}, (err, issues) => {
                if (err) {
                    return next(err);
                }
                let usersWithIssues = [];
                users.forEach(user => {
                    usersWithIssues.push(
                        {
                            _id: user._id,
                            email: user.email,
                            lastname: user.lastname,
                            firstname: user.firstname,
                            role: user.role,
                            issues: issues.filter(issue => {
                                return issue._owner.equals(user._id)
                            })
                        }
                    )

                });
                console.log(usersWithIssues)
                res.locals.users = usersWithIssues
                res.locals.usersOnPage = usersWithIssues.slice((page - 1) * 15, page * 15)

                return next();
            });
        })
            .sort({firstname: 1, lastname: 1, email: 1})

    };
};
