module.exports = (sequelize, DataTypes) => {
    const OAuth = sequelize.define('OAuth', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'oauth_token',
        timestamps: false
    });

    const User = sequelize.import('./User.js');
    OAuth.belongsTo(User, {foreignKey: 'user_id'});

    return OAuth
};
