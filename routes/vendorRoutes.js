const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { authenticateVendor } = require('../middlewares/authMiddleware');

router.post('/register', vendorController.register);
router.post('/login', vendorController.login);
router.get('/profile', authenticateVendor, vendorController.profile);

// admin adds a vendor
router.post('/admin/create', vendorController.createByAdmin);
// get all vendors 
router.get('/admin/all', vendorController.getAllVendors);
// delete vendor
router.delete('/admin/:id', vendorController.deleteVendor);
// edit vendor
router.get('/edit/:id', vendorController.editPage);
//update vendor
router.put('/:id', vendorController.updateByAdmin);







module.exports = router;
