module.exports = function(url) {
    return function(req, res) {
        return res.redirect(url.replace(":userid", req.params.userid).replace(":issueid", req.params.issueid))
    };
};