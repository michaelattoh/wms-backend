const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

router.post('/google', auth.googleLogin);
router.post('/apple', auth.appleLogin);

module.exports = router;
