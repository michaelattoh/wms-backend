const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // or your SMTP provider
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingConfirmation = async (to, bookingDetails) => {
  const mailOptions = {
    from: `"Wedding Planner" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Booking Confirmation - ${bookingDetails.bookingId}`,
    html: `
      <h3>Hello,</h3>
      <p>Your booking has been confirmed. Here are the details:</p>
      <ul>
        <li><strong>Booking ID:</strong> ${bookingDetails.bookingId}</li>
        <li><strong>Event Type:</strong> ${bookingDetails.eventType}</li>
        <li><strong>Venue:</strong> ${bookingDetails.venue}</li>
        <li><strong>Event Date:</strong> ${bookingDetails.eventDate}</li>
        <li><strong>Booking Status:</strong> ${bookingDetails.bookingStatus}</li>
      </ul>
      <p>Thank you for choosing us!</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendBookingConfirmation };
