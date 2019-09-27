const router = require('express').Router();

const {userController} = require('../controllers');
const checkToken = require('../middlewares/checkToken');

router.get('/', userController.getByName);
router.get('/filter', checkToken, userController.filerUser);
router.get('/:user_id', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;
