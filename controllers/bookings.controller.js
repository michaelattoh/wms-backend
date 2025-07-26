const { Booking, User, Vendor } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { sendBookingConfirmation } = require('../utils/emailService');
const { authenticateVendor } = require('../middlewares/authMiddleware');

exports.createBooking = async (req, res) => {
  try {
    const bookingId = `BK-${uuidv4().slice(0, 8).toUpperCase()}`;

    const normalizedPaymentStatus = normalizePaymentStatus(req.body.paymentStatus);
    const normalizedBookingStatus = req.body.bookingStatus?.toLowerCase() || 'pending';

    const newBooking = await Booking.create({
      ...req.body,
      bookingId,
      paymentStatus: normalizedPaymentStatus,
      bookingStatus: normalizedBookingStatus,
    });

    // Send confirmation email
    const user = await User.findByPk(req.body.userId);
    if (user?.email) {
      await sendBookingConfirmation(user.email, newBooking);
    }

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { userId: req.user.userId } });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const updateData = { ...req.body };

    if (updateData.bookingStatus) {
      updateData.bookingStatus = updateData.bookingStatus.toLowerCase();
    }

    if (updateData.paymentStatus) {
      updateData.paymentStatus = normalizePaymentStatus(updateData.paymentStatus);
    }

    await booking.update(updateData);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.bookingStatus = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper function to normalize payment status
const normalizePaymentStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'completed';
    case 'partially paid':
    case 'unpaid':
    default:
      return 'pending';
  }
};

//get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'] // You can include more if needed
        },
        {
          model: Vendor,
          as: 'vendor',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
