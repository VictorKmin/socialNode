const ControllerError = require('../error/ControllerError');
const tokenVerificator = require('../helpers/tokenVerificator');

module.exports = (req, res, next) => {
    try {
        const authToken = req.get('Authorization');
        const confirmToken = req.query.t;

        let user = {};

        if (authToken) user = tokenVerificator(authToken, 'auth');
        if (confirmToken) user = tokenVerificator(confirmToken, 'confirm');

        if (!user) throw new ControllerError('No token', 401, 'checkToken');

        req.user = user;
        next();
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'checkToken'))
    }
};
