const { VendorProduct, Vendor } = require('../models');

exports.createProduct = async (req, res) => {
    try{
        const {
            name,
            quantity,
            stock,
            price,
            sizes,
            tags,
            description,
            features,
            actualPrice,
            discount,
            publishDateTime
        } = req.body;

        // store filenames or URLs
        const imagePaths = req.files.map(file => file.path);

        const product = await VendorProduct.create({
            name,
            quantity,
            stock,
            price,
            sizes,
            tags,
            description,
            images: JSON.stringify(imagePaths),
            features,
            actualPrice,
            discount,
            publishDateTime
        });

        return res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create product', error });
    }
};

exports.getAllVendorProducts = async (req, res) => {
    try {
      const products = await VendorProduct.findAll({
        include: [
          {
            model: Vendor,
            as: 'vendor',
            attributes: ['name', 'category']
          }
        ]
      });
  
      res.json({ products });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };