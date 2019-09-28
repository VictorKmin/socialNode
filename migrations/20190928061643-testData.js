'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.sequelize.query(`INSERT INTO gender(label) VALUE ('male')`);
        await queryInterface.sequelize.query(`INSERT INTO sex(label) VALUE ('Male')`);
        await queryInterface.sequelize.query(`INSERT INTO sex(label) VALUE ('Female')`);
        await queryInterface.sequelize.query(`INSERT INTO sex(label) VALUE ('Unknown')`);
        await queryInterface.sequelize.query(`INSERT INTO sex(label) VALUE ('Other')`);

        await queryInterface.sequelize.query(`INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Dima', 'Petrov', 'dimasik@mail.ru', '12345', 1)`);
        await queryInterface.sequelize.query(`INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Irinka', 'Markiv', 'irisha@mail.ru', '1111', 2)`);
        await queryInterface.sequelize.query(`INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Karisha', 'Dudaeva', 'kery@mail.ru', '1', 2)`);
        await queryInterface.sequelize.query(`INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Donguan', 'Ispanev', 'donny@mail.ru', '1', 4)`);
        await queryInterface.sequelize.query(`INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Little', 'Jimmy', 'bigboy@mail.ru', '1', 3)`);
        await queryInterface.sequelize.query(`INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Tema', 'Kitav', 'artemka@mail.ru', '1', 1)`);

        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (1, 4)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (1, 2)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (1, 6)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (3, 6)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (3, 2)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (3, 1)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (4, 2)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (4, 5)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (4, 3)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (5, 1)`);
        await queryInterface.sequelize.query(`INSERT INTO friend(user_id, friend_id) VALUE (5, 2)`);
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
