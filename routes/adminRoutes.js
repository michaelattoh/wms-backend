const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


// Add Admin
router.post('/add', adminController.addAdmin);
// View all Admins
router.get('/all', adminController.getAllAdmins);
//update admin
router.put('/update/:id', adminController.updateAdmin);
//delete admin by ID
router.delete('/delete/:id', adminController.deleteAdmin);





module.exports = router;