const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const controller = require('../controllers/notifications.controller');

router.post('/send-invites', controller.sendGuestInvites);

module.exports = router;
