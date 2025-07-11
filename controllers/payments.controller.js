const paymentService = require('../services/payment.service');

exports.initiatePayment = async (req, res) => {
  try {
    const { provider, amount, bookingId } = req.body;
    const { payment, url } = await paymentService.initiatePayment({
      provider,
      amount,
      userId: req.user.id,
      bookingId,
    });
    res.json({ payment, url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { transactionId, provider } = req.body;
    const payment = await paymentService.confirmPayment({ transactionId, provider });
    res.json({ message: 'Payment confirmed', payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.releasePayout = async (req, res) => {
  try {
    const { vendorId, amount, urgent } = req.body;
    const result = await paymentService.releasePayout({ vendorId, amount, urgent });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
