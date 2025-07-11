const { Portfolio } = require('../models');
const path = require('path');

exports.uploadPortfolio = async (req, res) => {
  try {
    const files = req.files.map(file => `/uploads/portfolios/${file.filename}`);
    const { title, description } = req.body;

    const portfolio = await Portfolio.create({
      userId: req.user.id,
      title,
      description,
      media: files,
    });

    res.status(201).json({ message: 'Portfolio uploaded', portfolio });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVendorPortfolio = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const portfolios = await Portfolio.findAll({ where: { userId: vendorId } });

    res.json({ portfolios });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
