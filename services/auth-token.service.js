const db = require('../dataBase').getInstance();
const ControllerError = require('../error/ControllerError');

class OAuthService {
    createTokens(tokenObj) {
        const OAuthModel = db.getModel('OAuth');
        try {
            return OAuthModel.create(tokenObj)
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'auth-token.service/createTokens')
        }
    }

    getAccessToken(access_token) {
        const OAuthModel = db.getModel('OAuth');
        try {
            return OAuthModel.findOne({
                where: {
                    access_token
                }
            })
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'auth-token.service/getAccess')
        }
    }

    getRefreshToken(refresh_token) {
        const OAuthModel = db.getModel('OAuth');
        try {
            return OAuthModel.findOne({
                where: {
                    refresh_token
                }
            })
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'auth-token.service/getRefresh')
        }
    }

    deleteTokenByParams(tokenObj) {
        const OAuthModel = db.getModel('OAuth');
        try {
            return OAuthModel.destroy({
                where: tokenObj
            })
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'auth-token.service/destroyToken')
        }
    }

    getTokenByParams(tokenObj) {
        const OAuthModel = db.getModel('OAuth');
        try {
            return OAuthModel.findOne({
                where: tokenObj
            })
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'auth-token.service/getTokenByParams')
        }
    }
}

module.exports = new OAuthService();
