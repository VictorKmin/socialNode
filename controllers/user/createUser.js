const db = require('../../dataBase').getInstance();
const {hashPassword} = require('../../helpers/passwordHasher');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const UserModel = db.getModel('User');
        const PhotoModel = db.getModel('Photo');
        let {name, surname, password, email, sex = 3} = req.body;
        if (!name || !surname || !password || !email) throw new Error('Some field is empty');

        const hashedPass = await hashPassword(password);
        const insertedUser = await UserModel.create({
            name,
            surname,
            email,
            password: hashedPass,
            sex_id: sex
        });

        if (req.files) {
            let {photo} = req.files;
            const {id} = insertedUser.dataValues;
            await PhotoModel.create({
                user_id: id,
                path: photo[0].path
            });
        }


        delete insertedUser.dataValues.password;
        res.json({
            success: true,
            msg: insertedUser
        });
    } catch (e) {
        console.log(e);
        next(new ControllerError(e.message, e.status, 'createUser'))
    }
};
