const { OAuth2Client } = require('google-auth-library');
const appleSignin = require('apple-signin-auth');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ where: { google_id: googleId } });

    if (!user) {
      user = await User.create({
        google_id: googleId,
        email,
        name,
        role: 'user',
      });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ error: 'Google auth failed' });
  }
};

exports.appleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decoded = await appleSignin.verifyIdToken(idToken, {
      audience: process.env.APPLE_CLIENT_ID,
    });

    const { sub: appleId, email } = decoded;

    let user = await User.findOne({ where: { apple_id: appleId } });

    if (!user) {
      user = await User.create({
        apple_id:appleId,
        email,
        name: '', // Apple might not return name on subsequent logins
        role: 'user',
      });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Apple auth failed' });
  }
};
