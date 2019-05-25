module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        friend_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {
        tableName: 'friend',
        timestamps: false
    });

    const User = sequelize.import('./User.js');
    Friend.belongsTo(User, {foreignKey: 'user_id'});
    Friend.belongsTo(User, {foreignKey: 'friend_id'});

    return Friend
};
