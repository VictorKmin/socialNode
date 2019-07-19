const router = require('express').Router();

const createUser = require('../controllers/user/createUser');
const getByName = require('../controllers/user/getByName');
const getById = require('../controllers/user/getById');

const multer = require('multer');
const uuid = require('uuid/v4');
const {IMAGES} = require('../constants/extensions');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (IMAGES.includes(file.mimetype)) {
            cb(null, 'public/photos')
        } else {
            cb('UNKNOWN FILE', null)
        }
    },
    filename: function (req, file, cb) {
        // ⇨ 5745c60-7b1a-11e8-9c9c-2d42b21b1a3e.jpg
        cb(null, uuid() + '.' + file.originalname.split('.').pop())
    }
});

const upload = multer({storage});


router.get('/', getByName);
router.get('/:user_id', getById);
router.post('/', upload.fields([{name: 'photo', maxCount: 1}]), createUser);

module.exports = router;
