const router = require('express').Router();

let addNewFriend = require('../controllers/friends/addNewFriend');
let deleteFriend = require('../controllers/friends/deleteFriend');
let getAllFriends = require('../controllers/friends/getAllFriends');


router.post('/:id', addNewFriend);
router.delete('/:id', deleteFriend);
router.get('/', getAllFriends);


module.exports = router;
