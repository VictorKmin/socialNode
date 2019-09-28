'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        try {
            const genderTable = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                label: {
                    type: Sequelize.STRING
                }
            }
            await queryInterface.createTable("gender", genderTable);

            const userTable = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                surname: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                city: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                birthday: {
                    type: Sequelize.DATE,
                    allowNull: true
                },
                gender_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    references: {
                        model: 'gender',
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL"
                },
                photo: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                created_at: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn('now')
                }
            }

            await queryInterface.createTable("user", userTable);

            const friendTable = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    references: {
                        model: 'user',
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                friend_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    reference: {
                        model: 'user',
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }
            }

            await queryInterface.createTable("friend", friendTable);

            const photoTable = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    references: {
                        model: 'user',
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                path: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            }

            await queryInterface.createTable("photo", photoTable);


            const authTable = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'user',
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                access_token: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                refresh_token: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            }

            await queryInterface.createTable("oauth_token", authTable);


        } catch (e) {
            console.log('______________________-');
            console.log(e);
            console.log('______________________-');
        }

    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.dropTable('friend');
        await queryInterface.dropTable('photo');
        await queryInterface.dropTable('oauth_token');
        await queryInterface.dropTable('user');
        await queryInterface.dropTable('gender');
    }
};
