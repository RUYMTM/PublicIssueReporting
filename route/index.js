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
const redirectBackMW = require('../middleware/redirectBack');
const validateProfileDataMW = require('../middleware/user/validateProfileData');
const getAllUserMW = require('../middleware/user/getAllUser');
const getTokenMW = require('../middleware/token/getToken');
const checkValidityMW = require('../middleware/token/checkValidity');
const checkValidDataMW = require('../middleware/token/checkValidData');
const changePasswordUserMW = require('../middleware/user/changeUserPassword');
const deleteTokenMW = require('../middleware/token/deleteToken')

const UserModel = require('../model/user');
const IssueModel = require('../model/issue');
const TokenModel = require('../model/token');

module.exports = function (app) {
    const objRepo = {
        UserModel: UserModel,
        IssueModel: IssueModel,
        TokenModel: TokenModel
    };

    app.post('/',
        passwordValidationMW(objRepo),
        errorRenderMW( 'login'),
        renderMW( 'login'));


    app.get('/',
        checkIfLoggedInMW(),
        manageSuccessMW(),
        renderMW( 'login'));

    app.get('/registry',
        checkIfLoggedInMW(),
        errorRenderMW( 'registry'),
        renderMW( 'registry'));

    app.post('/registry',
        checkIfLoggedInMW(),
        checkRegistryDataMW(objRepo),
        upsertUserMW(objRepo),
        errorRenderMW( 'registry'));

    app.use('/forgotten_password',
        checkIfLoggedInMW(),
        checkUserExistMW(objRepo),
        sendPasswordRequestMW(objRepo),
        renderMW( 'forgotten_password'));

    app.get('/issues',
        authMW(),
        getAllIssueMW(objRepo),
        renderMW( 'issue_report_list'));

    app.get('/issues/:userid',
        authMW(),
        getUserMW(objRepo),
        getIssuesMW(objRepo),
        renderMW( 'own_issues'));

    app.use('/issues/:userid/new',
        authMW(),
        checkPermissionMW());

    app.get('/issues/:userid/new',
        renderMW( 'new_issue'));

    app.post('/issues/:userid/new',
        getUserMW(objRepo),
        upsertIssueMW(objRepo),
        redirectBackMW());

    app.use('/issues/:userid/edit/:issueid',
        authMW(),
        checkPermissionMW(),
        getUserMW(objRepo),
        getIssueMW(objRepo));

    app.get('/issues/:userid/edit/:issueid',
        errorRenderMW( 'edit_issue'),
        renderMW( 'edit_issue'));

    app.post('/issues/:userid/edit/:issueid',
        upsertIssueMW(objRepo),
        errorRenderMW( 'edit_issue'),
        redirectBackMW());

    app.get('/issues/:userid/del/:issueid',
        authMW(),
        checkPermissionMW(),
        getUserMW(objRepo),
        getIssueMW(objRepo),
        deleteIssueMW(objRepo),
        redirectBackMW());

    app.get('/profile/:userid',
        authMW(),
        getUserMW(objRepo),
        getIssuesMW(objRepo),
        renderMW( 'profile'));

    app.use('/user/edit/:userid',
        authMW(),
        checkPermissionMW(),
        getUserMW(objRepo));

    app.get('/user/edit/:userid',
        errorRenderMW( 'edit_profile'),
        renderMW( 'edit_profile'));

    app.post('/user/edit/:userid',
        validateProfileDataMW(objRepo),
        upsertUserMW(objRepo),
        errorRenderMW( 'edit_profile'));

    app.get('/user/del/:userid',
        authMW(),
        checkPermissionMW(),
        getUserMW(objRepo),
        deleteUserMW(objRepo),
        logoutMW());

    app.get('/users',
        authMW(),
        getAllUserMW(objRepo),
        renderMW( 'users'));

    app.use('/password_reset/:userid/:token',
        checkIfLoggedInMW(),
        getUserMW(objRepo),
        getTokenMW(objRepo),
        checkValidityMW());

    app.get('/password_reset/:userid/:token',
        errorRenderMW( 'password_reset'),
        renderMW( 'password_reset'));

    app.post('/password_reset/:userid/:token',
        checkValidDataMW(),
        changePasswordUserMW(),
        deleteTokenMW(objRepo),
        errorRenderMW( 'password_reset'));

    app.get('/logout', logoutMW());
};