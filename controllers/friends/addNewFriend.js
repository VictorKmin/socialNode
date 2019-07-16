const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const FriendModel = db.getModel('Friend');
        const {id} = req.user;
        const userToAdd = req.params.id;
        if (!userToAdd || userToAdd < 1) throw new Error('Bad user ID');

        const isFriendPresent =
            await FriendModel.findOne({
                where: {
                    [Op.or]: [
                        {
                            user_id: id,
                            friend_id: userToAdd
                        },
                        {
                            friend_id: id,
                            user_id: userToAdd
                        }]
                }
            });

        if (isFriendPresent) throw new Error('You are already fained with this user');

        await FriendModel.create({
            user_id: id,
            friend_id: userToAdd
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
