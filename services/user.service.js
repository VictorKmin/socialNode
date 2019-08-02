const db = require('../dataBase').getInstance();
const ControllerError = require('../error/ControllerError');

class UserService {
    async createUser(userObj) {
        const UserModel = db.getModel('User');
        try {
            return await UserModel.create(userObj)
        } catch (e) {
            console.log(e);
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/createUser')
        }
    }

    getUserById(id) {
        const UserModel = db.getModel('User');
        try {
            return UserModel.findByPk(id)
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/createUser')
        }
    }
}

module.exports = new UserService();
