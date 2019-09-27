const {userService, oauthService} = require('../../services');
const ControllerError = require('../../error/ControllerError');
const {passwordHasher, tokinazer} = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const {email = null, password = null} = req.body;

        const [isPresent] = await userService.getUserByParams({email});

        if (!isPresent) throw new ControllerError('You are not register', 400);

        const {id, password: hashPassword} = isPresent.dataValues;

        const isPassOK = await passwordHasher.chechHashPassword(password, hashPassword);
        if (!isPassOK) throw new Error('Password is wrong');

        const isUserLogged = await oauthService.getTokenByParams({user_id: id});

        if (isUserLogged) {
            console.log(`Send email to ${email}`)
        }

        const tokens = tokinazer.auth();

        await oauthService.createTokens({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            user_id: id
        });

        res.json({
            success: true,
            msg: tokens
        })
    } catch (e) {
        console.log(e);
        next(new ControllerError(e.message, e.status, 'auth/authUser'))
    }
};
