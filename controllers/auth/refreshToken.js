const ControllerError = require('../../error/ControllerError');
const tokenVerificator = require('../../helpers/tokenVerificator');
const action = require('../../constants/actions');
const tokinazer = require('../../helpers/tokinazer').auth;

module.exports = (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const user = tokenVerificator(token, action.REFRESH_TOKEN);
        delete user.exp, user.iat;
        const tokens = tokinazer(user);
        res.json({
            success: true,
            message: tokens
        })
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'refreshToken'))
    }
};
