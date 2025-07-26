const { Admin } = require('../models');
const bcrypt = require('bcryptjs');

exports.addAdmin = async (req, res) => {
    const { name, email, phone, username, password, role, status } = req.body;


    // backend password validation
    const passwordValid = password && password.length >= 8 && /\d/.test(password) && /[A-Za-z]/.test(password);
    if (!passwordValid) {
        return res.status(400).json({ message: 'Password must be at least 8 characters and include a number and a letter' });
    }

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

// get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// update admin 
exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, username, password, role, status } = req.body;
  
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        admin.password_hash = hashedPassword;
      }
  
      admin.name = name;
      admin.email = email;
      admin.phone = phone;
      admin.username = username;
      admin.role = role;
      admin.status = status;
  
      await admin.save();
  
      res.status(200).json({ message: 'Admin updated successfully', admin });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  //delete admin
  exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
  
    try {
      const admin = await Admin.findByPk(id);
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      await admin.destroy();
  
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting admin' });
    }
  };
  

