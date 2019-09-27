const router = require('express').Router();

const checkToken = require('../middlewares/checkToken');
const {authController} = require('../controllers');

router.post('/', authController.authUser);
router.post('/refresh', authController.refreshToken);
router.get('/password', authController.sendChangeEmail);
router.post('/password', authController.changePassword);

module.exports = router;
