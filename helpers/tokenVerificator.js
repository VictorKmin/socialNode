const jwt = require('jsonwebtoken');
let {secret, passSecret} = require('../constants/secret');

module.exports = (token, method) => {
    let secretWord = '';

    if (method === 'auth') secretWord = secret;
    if (method === 'confirm') secretWord = passSecret;

    if (!token) throw new Error('No token');
    let user = null;

    jwt.verify(token, secretWord, (err, decode) => {
        if (err) throw new Error('Not valid token');
        user = decode;
    });

    return user;
};
