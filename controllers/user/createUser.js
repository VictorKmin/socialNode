const db = require('../../dataBase').getInstance();

/**
 * This method using for....
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const PhotoModel = db.getModel('Photo');
        let {name, surname, password, email, sex = 3} = req.body;
        let {photo} = req.files;
        if (!name || !surname || !password || !email) throw new Error('Some field is empty');

        const insertedUser = await UserModel.create({
            name,
            surname,
            email,
            password,
            sex_id: sex
        });

        const {id} = insertedUser.dataValues;
        await PhotoModel.create({
            user_id: id,
            path: photo[0].path
        });

        res.json({
            success: true,
            msg: insertedUser
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
