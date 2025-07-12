const { Admin } = require('../models');
const bcrypt = require('bcryptjs');

exports.addAdmin = async (req, res) => {
    const { name, email, phone, username, password, role, status } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            phone,
            username,
            password_hash: hashedPassword,
            role: role || 'admin',
            status: status || 'active'
        });

        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};