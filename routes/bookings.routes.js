const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const bookings = require('../controllers/bookings.controller');

// Add auth middleware as needed
router.post('/', verifyToken, bookings.createBooking);
router.get('/user', verifyToken, bookings.getUserBookings);
router.put('/:id', verifyToken, bookings.updateBooking);
router.delete('/:id', verifyToken, bookings.cancelBooking);

//all bookings
router.get('/all', verifyToken, bookings.getAllBookings);

module.exports = router;




