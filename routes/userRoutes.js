const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login); // ← This one!
router.post('/add', userController.addUser);

router.get('/all', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);



module.exports = router;
