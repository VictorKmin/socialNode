const jwt = require('jsonwebtoken');
const {secret, passSecret} = require('../constants/secret');

module.exports = {
    auth: data => jwt.sign(data, secret, {expiresIn: '30d'}),
    password: data => jwt.sign(data, passSecret, {expiresIn: '5m'})
};
