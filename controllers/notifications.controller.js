const { Guest } = require('../models');
const notificationService = require('../services/notification.service');

exports.sendGuestInvites = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const guests = await Guest.findAll({ where: { bookingId } });

    for (const guest of guests) {
      const html = `
        <h2>You're Invited!</h2>
        <p>Dear ${guest.name},</p>
        <p>Please find your event QR code below. Show it at the entrance to check in.</p>
        <img src="${guest.qrCode}" alt="QR Code" />
      `;

      // Send email
      await notificationService.sendEmailInvite({
        to: guest.email,
        subject: 'Your Wedding Invite',
        html,
      });

      // Optionally send SMS too
      if (guest.phone) {
        await notificationService.sendSMS({
          to: guest.phone,
          message: `Hi ${guest.name}, you're invited! Show your QR code at check-in. Email sent to ${guest.email}.`,
        });
      }
    }

    res.json({ message: 'Invites sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
