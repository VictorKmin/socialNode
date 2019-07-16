module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            is: {
                args: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                msg: 'Email must be valid'
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: {
                    args: [6, 40],
                    msg: 'Password must be from 6 to 40 symbols'
                }
            }
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
