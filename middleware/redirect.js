module.exports = function(objRepo, url) {
    return function(req, res) {
        return res.redirect(url.replace(":userid", req.params.userid).replace(":issueid", req.params.issueid))
    };
};