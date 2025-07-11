const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const controller = require('../controllers/guestsTables.controller');

// Guests
router.post('/guests',verifyToken, controller.createGuest);
router.get('/guests/:bookingId', controller.getGuestList);
router.post('/guests/assign', controller.assignGuestToTable);

// Tables
router.post('/tables', verifyToken, controller.createTable);
router.get('/tables/:bookingId', controller.getTables);

module.exports = router;
