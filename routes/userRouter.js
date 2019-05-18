const router = require('express').Router();

let createUser = require('../controllers/user/createUser');
let getById = require('../controllers/user/getById');
let getByName = require('../controllers/user/getByName');

router.get('/', getByName);
router.get('/:id', getById);
router.post('/', createUser);

module.exports = router;
