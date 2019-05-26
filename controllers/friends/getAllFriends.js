const Op = require('sequelize').Op;
const Sequelize = require('sequelize');
const tokenVerificator = require('../../helpers/tokenVerificator');
const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const responseObj = {};
        const FriendModel = db.getModel('Friend');
        const UserModel = db.getModel('User');
        const SexModel = db.getModel('Sex');
        const token = req.get('Authorization');
        const {id} = tokenVerificator.auth(token);
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
                    attributes: ['name', 'surname'],
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
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
