const db = require('../../dataBase').getInstance();
const sendEmail = require('../../helpers/sendEmailChangePassword');

module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const {id, name} = req.user;
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
        res.status(e.status || 500)
            .json({
                success: false,
                msg: e.parent.sqlMessage || e.message
            })
    }
};
