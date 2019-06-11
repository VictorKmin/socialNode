module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: {
                    args: [2, 40],
                    msg: 'Name must be from 2 to 40 symbols'
                }
            }
        },
        surname: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: {
                    args: [2, 40],
                    msg: 'Surnmae must be from 2 to 40 symbols'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                is: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
            }
        },
        password: {
            type: DataTypes.STRING
        },
        sex_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {
        tableName: 'user',
        timestamps: false
    });


    const Sex = sequelize.import('./Sex.js');
    User.belongsTo(Sex, {foreignKey: 'sex_id'});
    return User
};
