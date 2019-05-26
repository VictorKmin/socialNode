const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
/**
 * This method using for search user by name
 * Firstly we get name from query object
 * If name is empty or not present we return all users from database
 * If name is not empty we need to filter all users by name and
 * push this users in new array.
 * Then we returns this array to front-end
 * @param req
 * @param res
 * @returns filtered - array of users which names includes name from query
 */
module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const SexModel = db.getModel('Sex');

        const {name = ''} = req.query;

        const token = req.get('Authorization');

        const {id, name: userName} = tokenVerificator.auth(token);

        const isPresent = await UserModel.findOne({
            where: {
                id,
                name: userName
            }
        });
        if (!isPresent) throw new Error('Not valid user');

        // if name is not present - find all users
        if (!name) {
            const allUsers = await UserModel.findAll({
                attributes: ["name", "surname", "sex_id"],
                include: [SexModel]
            });
            return res.json({
                success: true,
                msg: allUsers
            });
        }

        const allUsers = await UserModel.findAll({
            attributes: ["name", "surname", "sex_id"],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    {
                        surname: {
                            [Op.like]: `%${name}%`
                        }
                    }]
            },
            include: [SexModel]
        });

        res.json({
            success: true,
            msg: allUsers
        });

    } catch (e) {
        console.log(e);
        res.status(400)
            .json({
                success: false,
                msg: e.message
            })
    }
};
