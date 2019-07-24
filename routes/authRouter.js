const router = require('express').Router();
const checkToken = require('../middlewares/checkToken');

const authUser = require('../controllers/auth/authUser');
const changePassword = require('../controllers/auth/changePassword');
const sendChangeEmail = require('../controllers/auth/sendChangeEmail');
const refreshToken = require('../controllers/auth/refreshToken');

router.post('/', authUser);
router.post('/refresh', refreshToken);
router.get('/password', sendChangeEmail);
router.post('/password', changePassword);

module.exports = router;
