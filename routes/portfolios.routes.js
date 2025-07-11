const express = require('express');
const router = express.Router();
const portfolios = require('../controllers/portfolios.controller');
const upload = require('../middleware/upload.middleware');

// Auth middleware should verify user role as 'vendor' for upload
router.post('/', upload.array('media', 10), portfolios.uploadPortfolio); // max 10 files
router.get('/:vendorId', portfolios.getVendorPortfolio);

module.exports = router;
