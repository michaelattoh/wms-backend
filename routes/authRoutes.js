const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/google', auth.googleLogin);
router.post('/apple', auth.appleLogin);

module.exports = router;