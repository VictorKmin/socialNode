const db = require('../../dataBase').getInstance();
const sendEmail = require('../../helpers/sendEmailChangePassword');
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const token = req.get('Authorization');
        const {id, name} = tokenVerificator(token);

        const isPresent = await UserModel.findOne({
            where: {
                id, name
            }
        });
        if (!isPresent) throw new Error('User is not present');

       const info = await sendEmail(id);

        res.json({
            success: true,
            msg: info
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
