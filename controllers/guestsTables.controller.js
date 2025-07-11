const { Guest, Table } = require('../models');
const qrService = require('../services/qr.service');

exports.createGuest = async (req, res) => {
  try {
    const { name, email, phone, bookingId } = req.body;
    const guestData = { name, email, phone, bookingId, status: 'invited' };
    const qrCode = await qrService.generateQRCode(`${email}-${bookingId}`);
    guestData.qrCode = qrCode;

    const guest = await Guest.create(guestData);
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.assignGuestToTable = async (req, res) => {
  try {
    const { guestId, tableId } = req.body;
    const guest = await Guest.findByPk(guestId);
    if (!guest) return res.status(404).json({ error: 'Guest not found' });

    guest.tableId = tableId;
    await guest.save();
    res.json(guest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGuestList = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const guests = await Guest.findAll({ where: { bookingId } });
    res.json(guests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTables = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const tables = await Table.findAll({ where: { bookingId }, include: [Guest] });
    res.json(tables);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
