const router = require('express').Router();
const checkToken = require('../middlewares/checkToken');

const authUser = require('../controllers/auth/authUser');
const changePassword = require('../controllers/auth/changePassword');
const sendChangeEmail = require('../controllers/auth/sendChangeEmail');

router.post('/user', authUser);
router.get('/user/password', sendChangeEmail);
router.post('/user/password', changePassword);

module.exports = router;
