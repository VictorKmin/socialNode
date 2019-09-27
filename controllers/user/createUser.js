const {resolve: resolvePath} = require('path');
const Joi = require('joi');

const db = require('../../dataBase').getInstance();
const ControllerError = require('../../error/ControllerError');
const {fileChecker, passwordHasher} = require('../../helpers');
const {fileDirEnum} = require('../../constants');
const {userService} = require('../../services');
const {userValidator} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const PhotoModel = db.getModel('Photo');
        const userObj = req.body;

        if (!userObj.sex_id) userObj.sex_id = 3;

        const isUserValid = Joi.validate(userObj, userValidator);

        if (isUserValid.error) {
            throw new ControllerError(isUserValid.error.details[0].message, 400, 'user/createUser');
        }

        userObj.password = await passwordHasher.hashPassword(userObj.password);
        userObj.created_at = new Date().toISOString();

        const isUserPresent = await userService.getUserByParams({email: userObj.email});

        if (isUserPresent.length) {
            throw new ControllerError('User already registered', 400)
        }

        let insertedUser = await userService.createUser(userObj);
        const {id} = insertedUser.dataValues;

        if (req.files) {
            const {photo} = req.files;

            if (photo) {
                const {photo: goodPhoto} = await fileChecker(req.files, id, fileDirEnum.USERS);
                goodPhoto.mv(resolvePath(`${appRoot}/public/${goodPhoto.path}`));

                await PhotoModel.create({
                    user_id: id,
                    path: goodPhoto.path,
                    name: goodPhoto.name
                });

                insertedUser = await userService.updateUser({photo: goodPhoto.path}, id)
            }
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
