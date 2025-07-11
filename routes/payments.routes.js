const express = require('express');
const router = express.Router();
const payments = require('../controllers/payments.controller');

// Add auth middleware if needed
router.post('/initiate', payments.initiatePayment);
router.post('/confirm', payments.confirmPayment);
router.post('/payout', payments.releasePayout);

module.exports = router;
