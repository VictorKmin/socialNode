const router = require('express').Router();

let createUser = require('../controllers/user/createUser');
let getByName = require('../controllers/user/getByName');

router.get('/', getByName);
router.post('/', createUser);

module.exports = router;
