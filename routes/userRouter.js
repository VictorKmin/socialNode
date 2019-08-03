const router = require('express').Router();

const createUser = require('../controllers/user/createUser');
const getByName = require('../controllers/user/getByName');
const getById = require('../controllers/user/getById');
const filerUser = require('../controllers/user/filerUser');
const checkToken = require('../middlewares/checkToken');

router.get('/', getByName);
router.get('/filter', checkToken, filerUser);
router.get('/:user_id', getById);
router.post('/', createUser);

module.exports = router;
