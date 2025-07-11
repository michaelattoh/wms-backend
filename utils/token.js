// utils/token.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET || 'weddingapp_secret',
    { expiresIn: '7d' }
  );
};

module.exports = {
  generateToken,
};
