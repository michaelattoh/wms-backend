const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { uploadChat } = require('../middleware/upload.middleware');

// Optionally add token verification if needed for this upload route
router.post('/upload', verifyToken, uploadChat.single('file'), (req, res) => {
  const fileUrl = `/uploads/chat/${req.file.filename}`;
  res.json({
    fileUrl,
    type: req.file.mimetype.startsWith('image/') ? 'image' : 'file'
  });
});

module.exports = router;
