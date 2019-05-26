const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').password;
module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const {t: token} = req.query;
        let {password, passwordCopy} = req.query;
        const {user: id} = tokenVerificator(token);
        const isPresent = await UserModel.findByPk(id);
        if (!isPresent) throw new Error('User is not defined');
        console.log(req.query);
        if (password !== passwordCopy) throw new Error('Passwords is not equals');

        await UserModel.update({
            password
        }, {
            where: {
                id
            }
        });

        res.json({
            success: true,
            msg: 'OK'
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
