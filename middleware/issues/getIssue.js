/**
 * Load an issue from the database using the :issueid param
 * The result is saved to res.locals.issue
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        res.locals.issue = {
            _id: 0,
            description: "Kiégett utcai fény",
            location: "BP Mester utca 73 előtt",
            status: true,
            _owner: {
                _id: 0,
                email: 'email',
                lastname: 'Test',
                firstname: 'Test',
                password: 'password'
            }
        }
        next();
    };
};