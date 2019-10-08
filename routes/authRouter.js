const router = require('express').Router();

const {checkTokenMiddleware, isUserExistMiddleware} = require('../middlewares');
const {authController} = require('../controllers');

router.post('/', isUserExistMiddleware, authController.authUser);
router.post('/refresh', authController.refreshToken);
router.get('/password', authController.sendChangeEmail);
router.post('/password', authController.changePassword);

module.exports = router;
