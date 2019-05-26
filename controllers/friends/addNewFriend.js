const tokenVerificator = require('../../helpers/tokenVerificator');
const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const FriendModel = db.getModel('Friend');
        const token = req.get('Authorization');
        const {id} = tokenVerificator.auth(token);
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
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
