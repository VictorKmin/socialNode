const router = require('express').Router();

let authUser = require('../controllers/auth/authUser');
let changePassword = require('../controllers/auth/changePassword');
let sendChangeEmail = require('../controllers/auth/sendChangeEmail');

router.post('/user', authUser);
router.get('/user/password', sendChangeEmail);
router.post('/user/password', changePassword);

module.exports = router;
