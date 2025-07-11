const { Payment } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('@paypal/checkout-server-sdk');
const axios = require('axios');

exports.initiatePayment = async ({ provider, amount, userId, bookingId }) => {
  let paymentData = {};
  let transactionId;

  switch (provider) {
    case 'stripe':
      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'Booking Payment' },
            unit_amount: amount * 100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });
      transactionId = stripeSession.id;
      paymentData.url = stripeSession.url;
      break;

    case 'paypal':
      // TODO: Implement PayPal payment creation
      const paypalEnv = new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      );
      const paypalClient = new paypal.core.PayPalEnvironment(paypalEnv);
      break;

    case 'paystack':
      // TODO: Implement Paystack payment initiation
      break;
  }

  const payment = await Payment.create({
    userId,
    bookingId,
    amount,
    method: provider,
    status: 'initiated',
    transactionId,
  });

  return { payment, ...paymentData };
};

exports.confirmPayment = async ({ transactionId, provider }) => {
  let success = false;

  // Example: Stripe verification
  if (provider === 'stripe') {
    const session = await stripe.checkout.sessions.retrieve(transactionId);
    success = session.payment_status === 'paid';
  }

  // TODO: Confirm logic for PayPal & Paystack

  if (success) {
    const payment = await Payment.findOne({ where: { transactionId } });
    if (payment) {
      payment.status = 'confirmed';
      await payment.save();
    }
    return payment;
  }

  throw new Error('Payment not confirmed');
};

exports.releasePayout = async ({ vendorId, amount, urgent = false }) => {
  // You'd use Stripe Connect, PayPal Payouts, or Paystack Transfers here
  // Simulated payout logic
  return {
    vendorId,
    amount,
    status: urgent ? 'urgent release' : 'scheduled',
    payoutDate: urgent ? new Date() : new Date(Date.now() + 7 * 86400000),
  };
};
