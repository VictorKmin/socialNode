const ControllerError = require('../../error/ControllerError');
const {tokenVerificator, tokinazer} = require('../../helpers');
const {action} = require('../../constants');
const {oauthService, userService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        tokenVerificator(token, action.REFRESH_TOKEN);

        const oauthTokens = await oauthService.getRefreshToken(token);

        if (!oauthTokens) {
            throw new ControllerError('Wrong token', 403, 'auth/refreshToken')
        }

        const user_id = oauthTokens.dataValues.user_id;

        const isUserPresent = await userService.getUserById(user_id);

        if (!isUserPresent) {
            throw new ControllerError('Wrong token', 403, 'auth/refreshToken')
        }
        await oauthService.deleteTokenByParams({user_id, refresh_token: token});

        const tokens = tokinazer.auth();

        await oauthService.createTokens({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            user_id
        });

        res.json({
            success: true,
            message: tokens
        })
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'refreshToken'))
    }
};
