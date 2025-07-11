const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { authenticateVendor } = require('../middlewares/authMiddleware');

router.post('/register', vendorController.register);
router.post('/login', vendorController.login);
router.get('/profile', authenticateVendor, vendorController.profile);

module.exports = router;
