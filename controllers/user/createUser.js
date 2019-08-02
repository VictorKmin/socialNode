const {resolve: resolvePath} = require('path');
const db = require('../../dataBase').getInstance();
const {hashPassword} = require('../../helpers/passwordHasher');
const ControllerError = require('../../error/ControllerError');
const fileChecker = require('../../helpers/fileChecker');
const {USERS} = require('../../constants/fileDirEnum');
const {userService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const PhotoModel = db.getModel('Photo');
        let {name, surname, password, email, sex = 3} = req.body;
        let {photo} = req.files;

        if (!name || !surname || !password || !email) throw new Error('Some field is empty');

        const hashedPass = await hashPassword(password);
        const insertedUser = await userService.createUser({
            name,
            surname,
            email,
            password: hashedPass,
            sex_id: sex
        });
        const {id} = insertedUser.dataValues;

        if (photo) {
            const {photo: goodPhoto} = await fileChecker(req.files, id, USERS);
            goodPhoto.mv(resolvePath(`${appRoot}/public/${goodPhoto.path}`));
            await PhotoModel.create({
                user_id: id,
                path: goodPhoto.path,
                name: goodPhoto.name
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
