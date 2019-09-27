const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        // мб на фронті зробити віддільнуурлу під то
        const UserModel = db.getModel('User');
        let {password, passwordCopy} = req.query;
        const {id} = req.user;
        const isPresent = await UserModel.findByPk(id);
        if (!isPresent) throw new Error('User is not defined');
        if (password !== passwordCopy) throw new Error('Passwords is not equals');

        await UserModel.update({password},
            {where: {id}});

        res.json({
            success: true,
            msg: 'OK'
        })
    } catch (e) {
        res.status(e.status || 500)
            .json({
                success: false,
                msg: e.parent.sqlMessage || e.message
            })
    }
};
