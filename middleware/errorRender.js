module.exports = function(objRepo, viewName) {
    return function(req, res, next) {
        if(typeof res.locals.error !== "undefined"){
            console.log(res.locals.error)
            res.locals.pageName = viewName.replace(new RegExp("_", 'g'), " ")
            return res.render(viewName);
        }
        return next()
    };
};