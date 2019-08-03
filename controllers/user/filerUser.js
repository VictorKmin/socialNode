const ControllerError = require('../../error/ControllerError');
const {userService} = require('../../services');

module.exports = async (req, res, next) => {
    try {

        const params = req.query;

        console.log(params);
        const filterdUsers =  await userService.filterUsers(params);
        res.json({
            success: true,
            msg: filterdUsers
        })
    } catch (e) {
        next( new ControllerError(e.message, e.status, 'filterUser'))
    }
};
