const jwt = require('jsonwebtoken');
const {secret, passSecret, refreshSecret} = require('../constants/secret');

module.exports = {
    auth: data => {
        const accessToken = jwt.sign(data, secret, {expiresIn: '24h'});
        const refreshToken = jwt.sign(data, refreshSecret, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    },
    password: data => jwt.sign(data, passSecret, {expiresIn: '5m'})
};
