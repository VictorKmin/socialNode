const router = require('express').Router();

const checkToken = require('../middlewares/checkToken');

const addNewFriend = require('../controllers/friends/addNewFriend');
const deleteFriend = require('../controllers/friends/deleteFriend');
const getAllFriends = require('../controllers/friends/getAllFriends');


router.post('/:id', checkToken, addNewFriend);
router.delete('/:id', checkToken, deleteFriend);
router.get('/', checkToken, getAllFriends);


module.exports = router;
