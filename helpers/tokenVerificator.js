const jwt = require('jsonwebtoken');

const {action, secret} = require('../constants');

module.exports = (token, method) => {
    let secretWord = '';

    if (method === action.AUTH) secretWord = secret.secret;
    if (method === action.CONFIRM) secretWord = secret.passSecret;
    if (method === action.REFRESH_TOKEN) secretWord = secret.refreshSecret;

    if (!token) throw new Error('No token');

    let user = null;

    jwt.verify(token, secretWord, (err, decode) => {
        if (err) throw new Error('Not valid token');
        user = decode;
    });

    return user;
};
