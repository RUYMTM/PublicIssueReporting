const renderMW = require('../middleware/render');
const passwordValidationMW = require('../middleware/auth/passwordValidation');
const checkRegistryDataMW = require('../middleware/auth/checkRegistryData');
const sendPasswordRequestMW = require('../middleware/auth/sendPasswordRequest');
const checkUserExistMW = require('../middleware/auth/checkUserExist');
const checkPermissionMW = require('../middleware/auth/checkPermission');
const upsertUserMW = require('../middleware/user/upsertUser');
const authMW = require('../middleware/auth/auth');
const getAllIssueMW =require('../middleware/issues/getAllIssue');
const getUserMW =require('../middleware/user/getUser');
const getIssuesMW =require('../middleware/issues/getIssues');
const upsertIssueMW =require('../middleware/issues/upsertIssue');
const getIssueMW =require('../middleware/issues/getIssue');
const deleteIssueMW =require('../middleware/issues/deleteIssue');
const deleteUserMW =require('../middleware/user/deleteUser');

module.exports = function (app) {
    const objRepo = {};

    app.use('/',
        passwordValidationMW(objRepo),
        renderMW(objRepo, 'index'));

    app.use('/registry',
        checkRegistryDataMW(objRepo),
        upsertUserMW(objRepo),
        renderMW(objRepo, 'registry'));

    app.use('/forgotten_password',
        checkUserExistMW(objRepo),
        sendPasswordRequestMW(objRepo),
        renderMW(objRepo, 'forgotten_password'));

    app.get('/issues',
        authMW(objRepo),
        getAllIssueMW(objRepo),
        renderMW(objRepo, 'issue_report_list'));

    app.get('/issues/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        getIssuesMW(objRepo),
        renderMW(objRepo, 'own_issues'));

    app.use('/issues/:userid/new',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo),
        upsertIssueMW(objRepo),
        renderMW(objRepo, 'new_issue'));

    app.use('/issues/:userid/edit/:issueid',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo),
        getIssueMW(objRepo),
        upsertIssueMW(objRepo),
        renderMW(objRepo, 'edit_issue'));

    app.get('/issues/:userid/del/:issueid',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo),
        getIssueMW(objRepo),
        deleteIssueMW(objRepo));

    app.get('/profile/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        renderMW(objRepo, 'profile'));

    app.use('/user/edit/:userid',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo),
        upsertUserMW(objRepo),
        renderMW(objRepo, 'edit_profile'));

    app.get('/user/del/:userid',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo),
        deleteUserMW(objRepo));
};