var expect = require('chai').expect;
var upsertIssueMW = require('../../../../middleware/user/getUser');

describe('getUser middleware ', function () {
    it('should set res.locals.user with an user object from db and set res.locals.isItMe true', function (done) {
        const objRepo = {
            UserModel: {
                findOne: (condition, cb) => {
                    expect(condition).to.be.eql({_id: 1})
                    cb(null, {_id: 1})
                }
            }
        }
        const req = {
            params: {
                userid: 1
            },
            session: {
                userId: "1"
            }
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.an("undefined")
            expect(res.locals).to.be.eql({user: {_id: 1}, isItMe: true})
            done();
        }

        const mw = upsertIssueMW(objRepo)
        mw(req, res, next);
    });

    it('should set res.locals.user with an user object from db and set res.locals.isItMe false', function (done) {
        const objRepo = {
            UserModel: {
                findOne: (condition, cb) => {
                    expect(condition).to.be.eql({_id: 1})
                    cb(null, {_id: 1})
                }
            }
        }
        const req = {
            params: {
                userid: 1
            },
            session: {
                userId: "nem 1"
            }
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.an("undefined")
            expect(res.locals).to.be.eql({user: {_id: 1}, isItMe: false})
            done();
        }

        const mw = upsertIssueMW(objRepo)
        mw(req, res, next);
    });

    it('should call next but err, res.locals.user and res.locals.isItMe is undefined', function (done) {
        const objRepo = {
            UserModel: {}
        }
        const req = {
            params: {}
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.an("undefined")
            expect(res.locals).to.be.eql({})
            done();
        }

        const mw = upsertIssueMW(objRepo)
        mw(req, res, next);
    });

    it('should call next with error when there is a db problem', function (done) {
        const objRepo = {
            UserModel: {
                findOne: (condition, cb) => {
                    expect(condition).to.be.eql({_id: 1})
                    cb("error", null)
                }
            }
        }
        const req = {
            params: {
                userid: 1
            },
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.eql("error")
            done();
        }

        const mw = upsertIssueMW(objRepo)
        mw(req, res, next);
    });

    it('should call next when no user found in the db with the userId', function (done) {
        const objRepo = {
            UserModel: {
                findOne: (condition, cb) => {
                    expect(condition).to.be.eql({_id: 1})
                    cb(undefined, null)
                }
            }
        }
        const req = {
            params: {
                userid: 1
            },
            session: {
                userId: "1"
            }
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.an("undefined")
            expect(res.locals).to.be.eql({})
            done();
        }

        const mw = upsertIssueMW(objRepo)
        mw(req, res, next);
    });
});