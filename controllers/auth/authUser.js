let db = require('../../dataBase').getInstance();
let tokenizer = require('../../helpers/tokinazer').auth;
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const {email = '', password = ''} = req.body;
        if (!email || !password) throw new ControllerError('Some field is empty', 400);

        const isPresent = await UserModel.findOne({
            where: {
                email,
                password
            }
        });
        if (!isPresent) throw new ControllerError('You are not register', 400);

        const {id, name, sex_id} = isPresent;

        const token = tokenizer({id, name, sex_id});
        res.json({
            success: true,
            msg: token
        })
    } catch (e) {
        res.status(e.status || 500)
            .json({
                success: false,
                msg: e.message
            })
    }
};
