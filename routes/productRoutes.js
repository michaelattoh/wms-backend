const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload }= require('../middlewares/upload.middleware');

//POST api/product/create
router.post('/admin/products/create', upload.array('images', 6), productController.createProduct);
// fetch all products
router.get('/admin/products/all', productController.getAllVendorProducts);



module.exports = router;