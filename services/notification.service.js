const nodemailer = require('nodemailer');
const axios = require('axios');

// Use SMTP credentials from Gmail, Brevo, Resend, etc.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendEmailInvite = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"WeddingBot" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error('Email Error:', err);
    throw new Error('Email sending failed');
  }
};

exports.sendSMS = async ({ to, message }) => {
  try {
    const response = await axios.post('https://textbelt.com/text', {
      phone: to,
      message,
      key: process.env.TEXTBELT_API_KEY,
    });
    if (!response.data.success) throw new Error('SMS failed');
    return response.data;
  } catch (err) {
    console.error('SMS Error:', err.message);
    throw new Error('SMS sending failed');
  }
};
