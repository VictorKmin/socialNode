const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const SexModel = db.getModel('Sex');
        const {id} = req.params;
        await UserModel.findByPk(id, {
            attributes: ['id', 'name', 'surname', 'email'],
            include: [SexModel]
        });
        if (!user) throw new Error('User is not found');
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
