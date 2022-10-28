/**
 * Load all issues from the database
 * The result is saved to res.locals.allIssues
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.allIssues = [
            {
                _id: 0,
                description: "Kiégett utcai fény",
                location: "BP Mester utca 73 előtt",
                status: false,
                _owner: {
                    _id: 0,
                    email: 'email',
                    lastname: 'Test',
                    firstname: 'Test',
                    password: 'password'
                }
            },
            {
                _id: 1,
                description: "Törött pad",
                location: "BP Ferenciek tere villamos megálló",
                status: true,
                _owner: {
                    _id: 0,
                    email: 'email',
                    lastname: 'Test',
                    firstname: 'Test',
                    password: 'password'
                }
            }
        ]
        next();
    };
};
