const ControllerError = require('../error/ControllerError');
const tokenVerificator = require('../helpers/tokenVerificator');

module.exports = (req, res, next) => {
    try {
        const authToken = req.get('Authorization');
        const confirmToken = req.query.t;

        if (authToken) req.user = tokenVerificator(authToken, 'auth');
        if (confirmToken) req.user = tokenVerificator(confirmToken, 'confirm');

        if (!req.user) throw new ControllerError('No token', 401);

        next();
    } catch (e) {
        res.status(e.status || 500)
            .json({
                success: false,
                msg: e.parent.sqlMessage || e.message
            })
    }
};
