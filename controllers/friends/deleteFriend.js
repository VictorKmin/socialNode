const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();
module.exports = async (req, res) => {
    try {
        const FriendModel = db.getModel('Friend');
        const {id} = req.user;
        const userToRemove = req.params.id;
        if (!userToRemove || userToRemove < 1) throw new Error('Bad user ID');

       await FriendModel.destroy({
            where: {
                [Op.or]: [
                    {
                        user_id: id,
                        friend_id: userToRemove
                    },
                    {
                        friend_id: id,
                        user_id: userToRemove
                    }]
            }
        });

        res.json({
            success: true,
            msg: 'OK'
        })
    } catch (e) {
        res.status(e.status || 500)
            .json({
                success: false,
                msg: e.parent.sqlMessage || e.message
            })
    }
};
