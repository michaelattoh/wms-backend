const { Vendor } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.profile = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.vendor.vendorId);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    res.json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  const { name, email, phone, password, about, contact } = req.body;
  try {
    const existingVendor = await Vendor.findOne({ where: { email } });
    if (existingVendor) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await Vendor.create({
      name,
      email,
      phone,
      password_hash: hashedPassword,
      about,
      contact
    });

    res.status(201).json({ message: 'Vendor registered successfully', vendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ where: { email } });
    if (!vendor) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, vendor.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { vendorId: vendor.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, vendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
