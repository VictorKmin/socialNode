// let mysql = require('mysql2');
//
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'user',
//     password: 'user',
//     database: 'social',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });
//
// module.exports = pool;


const Sequalize = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequalize('social', 'root', 'groovy', {
            host: 'localhost',
            dialect: 'mysql'
        });
        let models = {};

        function getModels() {
            fs.readdir('./dataBase/models', (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(resolve(`./dataBase/models/${modelName}`))
                });
            });
        }

        return {
            getModel: modelName => models[modelName],
            setModels: () => getModels()
        };
    }

    return {
        getInstance: () => {
            if (!instance) instance = initConnection();
            return instance;
        }
    }
})();
