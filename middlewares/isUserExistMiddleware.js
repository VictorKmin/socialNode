const {userService} = require("../services");
const ControllerError = require("../error/ControllerError");

module.exports = async (req, res, next) => {
    const {email = null} = req.body;

    const [isPresent] = await userService.getUserByParams({email});

    if (!isPresent) {
        next(new ControllerError('User is not present', 401, ''))
    }

    req.user = isPresent;
    next()
}