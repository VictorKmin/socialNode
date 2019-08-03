const db = require('../dataBase').getInstance();
const ControllerError = require('../error/ControllerError');
const queryBuilder = require('../helpers/queryBuilder');

class UserService {
    createUser(userObj) {
        const UserModel = db.getModel('User');
        try {
            return UserModel.create(userObj)
        } catch (e) {
            console.log(e);
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/createUser')
        }
    }

    updateUser(updateObj, user_id) {
        const UserModel = db.getModel('User');
        try {
            return UserModel.update(updateObj, {
                where: {
                    id: user_id
                },
                returning: true
            })
        } catch (e) {
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

    filterUsers(params) {
        try {
            const client = db.getClient();
            const query = queryBuilder(params);
            return client.query(query)
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/filter')
        }
    }
}

module.exports = new UserService();
