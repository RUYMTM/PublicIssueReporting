/**
 * Load all issues of user from the database using the :userid param
 * The result is saved to res.locals.issues
 */
module.exports = function (objRepo) {
    return function (req, res, next) {

        res.locals.issues = [
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