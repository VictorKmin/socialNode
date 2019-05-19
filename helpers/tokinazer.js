const jwt = require('jsonwebtoken');
const {secret} = require('../constants/secret');

module.exports = data => jwt.sign(data, secret, {expiresIn: '30d'});
