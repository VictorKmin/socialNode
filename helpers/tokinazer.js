const jwt = require('jsonwebtoken');

const {secret, passSecret, refreshSecret} = require('../constants/secret');

module.exports = {
    auth: () => {
        const accessToken = jwt.sign({}, secret, {expiresIn: '24h'});
        const refreshToken = jwt.sign({}, refreshSecret, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    },
    password: data => jwt.sign(data, passSecret, {expiresIn: '5m'})
};
