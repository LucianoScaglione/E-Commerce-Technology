const { Router } = require('express');
const router = Router();
const Users = require('../controller/Users');

router.get('/', Users.findAllUsers);
router.get('/:id', Users.findOneUser);
router.post('/register', Users.registerUser);
router.post('/login', Users.loginUser);
router.put('/:id', Users.updateUser);

module.exports = router;