const router = require('express').Router();

const createUser = require('../controllers/user/createUser');
const getByName = require('../controllers/user/getByName');
const getById = require('../controllers/user/getById');

router.get('/', getByName);
router.get('/:user_id', getById);
router.post('/', createUser);

module.exports = router;
