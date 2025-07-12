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
  const { name, email, phone, password, about, contact, category, address  } = req.body;
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
      contact,
      category,
      address
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

// Create vendor from admin (no password involved)
exports.createByAdmin = async (req, res) => {
  const { name, email, phone, about, contact, category, address } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ where: { email } });
    if (existingVendor) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const vendor = await Vendor.create({
      name,
      email,
      phone,
      about,
      contact,
      category,
      address
    });

    res.status(201).json({ message: 'Vendor created successfully', vendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//delete vendor
exports.deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendor = await Vendor.findByPk(id);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    await vendor.destroy();
    res.json({ message: 'Vendor deleted successfully' });
  } catch (err)  {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// edit vendor
exports.editPage = async (req, res) => {
  const { id } = req.params;

  try {
    const vendor = await Vendor.findByPk(id);
    if (!vendor) {
      return res.status(404).send('Vendor not found');
    }
    res.render('editVendor', { vendor });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

//update vendor
exports.updateByAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, contact, category, address } = req.body;

  try {
    const vendor = await Vendor.findByPk(id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    await vendor.update({ name, email, phone, contact, category, address });

    res.json({ message: 'Vendor updated successfully', vendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};