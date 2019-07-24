const jwt = require('jsonwebtoken');
let {secret, passSecret, refreshSecret} = require('../constants/secret');

module.exports = (token, method) => {
    let secretWord = '';

    if (method === 'auth') secretWord = secret;
    if (method === 'confirm') secretWord = passSecret;
    if (method === 'refresh') secretWord = refreshSecret;

    if (!token) throw new Error('No token');
    let user = null;

    jwt.verify(token, secretWord, (err, decode) => {
        if (err) throw new Error('Not valid token');
        user = decode;
    });

    return user;
};
