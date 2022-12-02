var expect = require('chai').expect;
var checkRegistryDataMW = require('../../../../middleware/auth/checkRegistryData');

describe('checkRegistryData middleware ', function () {
    it('should set res.locals.email, res.locals.lastname, res.locals.firstname and res.locals.password with req.body parameters', function (done) {
        const objRepo = {
            UserModel: {
                findOne: (condition, cb) => {
                    expect(condition).to.be.eql({email: "email"})
                    cb(null, null)
                }
            }
        }
        const req = {
            body: {
                email: "email",
                lastname: "lastname",
                firstname: "firstname",
                password: "password",
                passwordConfirmation: "password"
            }
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.an("undefined")
            expect(res.locals).to.be.eql({
                email: "email",
                lastname: "lastname",
                firstname: "firstname",
                password: "password"
            })
            done();
        }

        const mw = checkRegistryDataMW(objRepo)
        mw(req, res, next);
    });
    it('should set res.locals.error: \'Az össze adatot ki kell tölteni!\'', function (done) {
        const objRepo = {
            UserModel: {}
        }
        const req = {
            body: {}
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.an("undefined")
            expect(res.locals).to.be.eql({
                error: "Az össze adatot ki kell tölteni!"
            })
            done();
        }
        const mw = checkRegistryDataMW(objRepo)
        mw(req, res, next);
    });
    it('should set res.locals.error: \'A jelszónak és a jelszó megerősítésnek meg kell egyeznie!\'', function (done) {
        const objRepo = {
            UserModel: {
                findOne: (condition, cb) => {
                    expect(condition).to.be.eql({email: "email"})
                    cb(null, null)
                }
            }
        }
        const req = {
            body: {
                email: "email",
                lastname: "lastname",
                firstname: "firstname",
                password: "password",
                passwordConfirmation: "other_password!"
            }
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.an("undefined")
            expect(res.locals).to.be.eql({
                error: "A jelszónak és a jelszó megerősítésnek meg kell egyeznie!"
            })
            done();
        }

        const mw = checkRegistryDataMW(objRepo)
        mw(req, res, next);
    });
    it('should set res.locals.error: \'Ezzel az e-mail címmel már létezik felhasználó!\'', function (done) {
        const objRepo = {
            UserModel: {
                findOne: (condition, cb) => {
                    expect(condition).to.be.eql({email: "email"})
                    cb(null, {email: "email"})
                }
            }
        }
        const req = {
            body: {
                email: "email",
                lastname: "lastname",
                firstname: "firstname",
                password: "password",
                passwordConfirmation: "password"
            }
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.an("null")
            expect(res.locals).to.be.eql({
                error: "Ezzel az e-mail címmel már létezik felhasználó!"
            })
            done();
        }

        const mw = checkRegistryDataMW(objRepo)
        mw(req, res, next);
    });
    it('should call next with error when there is a db problem', function (done) {
        const objRepo = {
            UserModel: {
                findOne: (condition, cb) => {
                    expect(condition).to.be.eql({email: "email"})
                    cb("error", null)
                }
            }
        }
        const req = {
            body: {
                email: "email",
                lastname: "lastname",
                firstname: "firstname",
                password: "password",
                passwordConfirmation: "password"
            }
        }
        const res = {
            locals: {}
        }
        const next = (err) => {
            expect(err).to.be.eql("error")
            done();
        }

        const mw = checkRegistryDataMW(objRepo)
        mw(req, res, next);
    });
});