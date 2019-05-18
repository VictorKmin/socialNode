
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
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
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
