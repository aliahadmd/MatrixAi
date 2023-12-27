const router = require('express').Router();
const {register} = require('../controllers/UsersController');

// register router
router.post('/register', register);

// export router
module.exports = router;