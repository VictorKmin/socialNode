const ControllerError = require('../error/ControllerError');
const tokenVerificator = require('../helpers/tokenVerificator');
const action = require('../constants/actions');

module.exports = (req, res, next) => {
    try {
        const authToken = req.get('Authorization');
        const confirmToken = req.query.t;

        let user = {};

        if (!authToken && !confirmToken) {
            throw new ControllerError('No token', 401, 'checkToken');
        }

        if (authToken) user = tokenVerificator(authToken, action.AUTH);
        if (confirmToken) user = tokenVerificator(confirmToken, action.CONFIRM);

        req.user = user;
        next();
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'checkToken'))
    }
};
