const jwt = require('jsonwebtoken');
let {secret, passSecret, refreshSecret} = require('../constants/secret');
let action = require('../constants/actions');

module.exports = (token, method) => {
    let secretWord = '';

    if (method === action.AUTH) secretWord = secret;
    if (method === action.CONFIRM) secretWord = passSecret;
    if (method === action.REFRESH_TOKEN) secretWord = refreshSecret;

    if (!token) throw new Error('No token');
    let user = null;

    jwt.verify(token, secretWord, (err, decode) => {
        if (err) throw new Error('Not valid token');
        user = decode;
    });

    return user;
};
