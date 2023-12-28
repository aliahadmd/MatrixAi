const router = require('express').Router();
const {register, login, logout} = require('../controllers/UsersController');

// register router
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// export router
module.exports = router;