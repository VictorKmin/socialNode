const Joi = require('joi');

const {regExp} = require('../constants');

module.exports = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(40).required(),
    surname: Joi.string().alphanum().min(2).max(40).required(),
    city: Joi.string().min(2).max(40),
    password: Joi.string().min(8).max(50).regex(regExp.strongPass).required(),
    sex_id: Joi.number().min(1).max(4).required(),
    photo: Joi.string().min(15).max(200),
    email: Joi.string().email().required(),
    birthday: Joi.string().alphanum().min(4).max(10)
});
