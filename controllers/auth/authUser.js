let db = require('../../dataBase').getInstance();
let tokenizer = require('../../helpers/tokinazer').auth;
const ControllerError = require('../../error/ControllerError');
const {chechHashPassword} = require('../../helpers/passwordHasher');

module.exports = async (req, res, next) => {
    try {
        const UserModel = db.getModel('User');
        const {email = '', password = ''} = req.body;
        if (!email || !password) throw new ControllerError('Some field is empty', 400);

        const isPresent = await UserModel.findOne({
            where: {email}
        });
        if (!isPresent) throw new ControllerError('You are not register', 400);

        const {id, name, sex_id, password: hashPassword} = isPresent;

        const isPassOK = await chechHashPassword(password, hashPassword);
        if (!isPassOK) throw new Error('Password is wrong');

        const token = tokenizer({id, name, sex_id});
        res.json({
            success: true,
            msg: token
        })
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'auth/authUser'))
    }
};
