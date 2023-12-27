const router = require('express').Router();
const {register, login} = require('../controllers/UsersController');

// register router
router.post('/register', register);
router.post('/login', login);

// export router
module.exports = router;