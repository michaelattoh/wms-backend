const multer = require('multer');
const path = require('path');

//portfolio upload storage
const portfolioStorage = multer.diskStorage({
  destination: './uploads/portfolios',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
//chat upload storage
const chatStorage = multer.diskStorage({
  destination: './uploads/chat',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.mp4', '.mov'].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image/video files are allowed'), false);
  }
};

//upload instances
const uploadPortfolio = multer({ storage: portfolioStorage, fileFilter });
const uploadChat = multer({ storage: chatStorage, fileFilter });

module.exports = {
  uploadPortfolio,
  uploadChat,
};
