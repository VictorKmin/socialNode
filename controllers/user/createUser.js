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
        let {name, surname, password, email, sex = 3} = req.body;
        if (!name || !surname || !password || !email) throw new Error('Some field is empty');

        const insertedUser = await UserModel.create({
            name,
            surname,
            email,
            password,
            sex_id: sex
        });

        res.json(insertedUser)
    } catch (e) {
        console.log(e);
        res.status(400).json(e.message)
    }
};
