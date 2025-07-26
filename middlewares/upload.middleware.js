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

const mediaFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.mp4', '.mov'].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image/video files are allowed'), false);
  }
};

//upload instances
const uploadPortfolio = multer({ storage: portfolioStorage, fileFilter: mediaFileFilter });
const uploadChat = multer({ storage: chatStorage, fileFilter: mediaFileFilter });

// define storage for products
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// file filter
const ImageFileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, JPG and WEBP formats allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter: ImageFileFilter,
  limits: { fileSize: 3 * 1024 * 1024 } // 3MB max size
});


module.exports = {
  uploadPortfolio,
  uploadChat,
  upload 
};
