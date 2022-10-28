/**
 * Using the template engine render the values into the template
 */

module.exports = function(objRepo, viewName) {
    return function(req, res) {
        res.locals.pageName = viewName.replace(new RegExp("_", 'g'), " ")
        res.render(viewName);
    };
};