const router = require('express').Router();

const checkToken = require('../middlewares/checkToken');
const {friendsController} = require('../controllers');

router.post('/:id', checkToken, friendsController.addNewFriend);
router.delete('/:id', checkToken, friendsController.deleteFriend);
router.get('/', checkToken, friendsController.getAllFriends);

module.exports = router;
