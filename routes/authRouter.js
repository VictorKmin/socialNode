const router = require('express').Router();

let authUser = require('../controllers/auth/authUser');

router.post('/user', authUser);

module.exports = router;
