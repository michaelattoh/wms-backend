const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Add Admin
router.post('/add', adminController.addAdmin);

// View all Admins
router.get('/all', adminController.getAllAdmins);

module.exports = router;