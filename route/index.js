const renderMW = require('../middleware/render');
const passwordValidationMW = require('../middleware/auth/passwordValidation');
const checkRegistryDataMW = require('../middleware/auth/checkRegistryData');
const sendPasswordRequestMW = require('../middleware/auth/sendPasswordRequest');
const checkUserExistMW = require('../middleware/auth/checkUserExist');
const checkPermissionMW = require('../middleware/auth/checkPermission');
const upsertUserMW = require('../middleware/user/upsertUser');
const authMW = require('../middleware/auth/auth');
const getAllIssueMW = require('../middleware/issues/getAllIssue');
const getUserMW = require('../middleware/user/getUser');
const getIssuesMW = require('../middleware/issues/getIssues');
const upsertIssueMW = require('../middleware/issues/upsertIssue');
const getIssueMW = require('../middleware/issues/getIssue');
const deleteIssueMW = require('../middleware/issues/deleteIssue');
const deleteUserMW = require('../middleware/user/deleteUser');
const manageSuccessMW = require('../middleware/auth/manageSuccess');
const checkIfLoggedInMW = require('../middleware/auth/checkIfLoggedIn');
const logoutMW = require('../middleware/auth/logout');
const errorRenderMW = require('../middleware/errorRender');
const redirectMW = require('../middleware/redirect');

module.exports = function (app) {
    const objRepo = {};

    app.post('/',
        passwordValidationMW(objRepo),
        errorRenderMW(objRepo, 'login'),
        renderMW(objRepo, 'login'));


    app.get('/',
        checkIfLoggedInMW(objRepo),
        manageSuccessMW(objRepo),
        renderMW(objRepo, 'login'));

    app.get('/registry',
        checkIfLoggedInMW(objRepo),
        errorRenderMW(objRepo, 'registry'),
        renderMW(objRepo, 'registry'));

    app.post('/registry',
        checkIfLoggedInMW(objRepo),
        checkRegistryDataMW(objRepo),
        upsertUserMW(objRepo),
        errorRenderMW(objRepo, 'registry'),
        redirectMW(objRepo, '/'));

    app.use('/forgotten_password',
        checkIfLoggedInMW(objRepo),
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
        checkPermissionMW(objRepo));

    app.get('/issues/:userid/new',
        renderMW(objRepo, 'new_issue'));

    app.post('/issues/:userid/new',
        getUserMW(objRepo),
        upsertIssueMW(objRepo),
        redirectMW(objRepo,'/issues/:userid'));

    app.use('/issues/:userid/edit/:issueid',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo),
        getIssueMW(objRepo));

    app.get('/issues/:userid/edit/:issueid',
        errorRenderMW(objRepo, 'edit_issue'),
        renderMW(objRepo, 'edit_issue'));

    app.post('/issues/:userid/edit/:issueid',
        upsertIssueMW(objRepo),
        errorRenderMW(objRepo, 'edit_issue'),
        redirectMW(objRepo,'/issues/:userid'));

    app.get('/issues/:userid/del/:issueid',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo),
        getIssueMW(objRepo),
        deleteIssueMW(objRepo),
        redirectMW(objRepo,'/issues/:userid'));

    app.get('/profile/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        getIssuesMW(objRepo),
        renderMW(objRepo, 'profile'));

    app.use('/user/edit/:userid',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo));

    app.get('/user/edit/:userid',
        errorRenderMW(objRepo, 'edit_profile'),
        renderMW(objRepo, 'edit_profile'));

    app.post('/user/edit/:userid',
        upsertUserMW(objRepo),
        errorRenderMW(objRepo, 'edit_profile'),
        redirectMW(objRepo,'/profile/:userid'));

    app.get('/user/del/:userid',
        authMW(objRepo),
        checkPermissionMW(objRepo),
        getUserMW(objRepo),
        deleteUserMW(objRepo),
        logoutMW(objRepo));

    app.get('/logout', logoutMW(objRepo));
};