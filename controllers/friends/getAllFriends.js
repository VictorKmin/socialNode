const Op = require('sequelize').Op;
const Sequelize = require('sequelize');
const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const responseObj = {};
        const FriendModel = db.getModel('Friend');
        const UserModel = db.getModel('User');
        const SexModel = db.getModel('Sex');
        const {id} = req.user;
        let {limit = 20, page = 1} = req.query;
        if (+page === 0) page = 1;
        page = page - 1;

        const friendCount =
            await FriendModel.findOne({
                where: {
                    [Op.or]: [
                        {
                            user_id: id,
                        },
                        {
                            friend_id: id,
                        }]
                },
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'friends_count']]
            });


        const allUsers = await FriendModel.findAll({
            attributes: [],
            where: {
                [Op.or]: [
                    {
                        user_id: id,
                    },
                    {
                        friend_id: id,
                    }]
            },
            include: [
                {
                    model: UserModel,
                    attributes: ['name', 'surname', 'id'],
                    include: [{
                        model: SexModel,
                        attributes: ['label']
                    }]
                }
            ],
            limit: +limit,
            offset: limit * page
        });

        responseObj.friends = allUsers;
        responseObj.pageCount = Math.ceil(friendCount.dataValues.friends_count / limit);


        res.json({
            success: true,
            msg: responseObj
        })
    } catch (e) {
        res.status(e.status || 500)
            .json({
                success: false,
                msg: e.parent.sqlMessage || e.message
            })
    }
};
