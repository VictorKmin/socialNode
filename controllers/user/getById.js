const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const SexModel = db.getModel('Sex');
        const PhotoModel = db.getModel('Photo');
        const {user_id} = req.params;
        const user = await UserModel.findByPk(user_id, {
            attributes: ['id', 'name', 'surname', 'email'],
            include: [SexModel]
        });

        const photos = await PhotoModel.findAll({
            where: {
                user_id
            }
        });

        if (!user) throw new Error('User is not found');

        user.dataValues.photos = photos;

        res.json({
            success: true,
            msg: user
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
