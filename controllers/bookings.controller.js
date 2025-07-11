const { Booking } = require('../models');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.user.userId });
    res.status(201).json(booking);
  } catch (error) {
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

    await booking.update(req.body);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
