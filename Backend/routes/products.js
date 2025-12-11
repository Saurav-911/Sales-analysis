const express = require('express');
const router = express.Router();
const Product = require('../models/product');  // Remove .js
const authMiddleware = require('../Middleware/auth');  // Remove .js
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.xlsx' && ext !== '.xls') {
      return cb(new Error('Only Excel files are allowed'));
    }
    cb(null, true);
  }
});

// Upload Excel file
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Transform and save data
    const products = data.map(row => ({
      salesDate: new Date(row['Sales Date'] || row.salesDate),
      productName: row['Product Name'] || row.productName,
      category: row['Category'] || row.category,
      quantitySold: parseInt(row['Quantity Sold'] || row.quantitySold),
      revenue: parseFloat(row['Revenue'] || row.revenue)
    }));

    await Product.insertMany(products);

    res.json({
      message: 'File uploaded and data saved successfully',
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
});

// Get all products
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find().sort({ salesDate: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Create new product
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { salesDate, productName, category, quantitySold, revenue } = req.body;

    const product = new Product({
      salesDate,
      productName,
      category,
      quantitySold,
      revenue
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// Update product
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { salesDate, productName, category, quantitySold, revenue } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { salesDate, productName, category, quantitySold, revenue },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// Get analytics data
router.get('/analytics/summary', authMiddleware, async (req, res) => {
  try {
    // Category-wise revenue for pie chart
    const categoryRevenue = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalRevenue: { $sum: '$revenue' }
        }
      }
    ]);

    // Product-wise quantity for bar chart
    const productQuantity = await Product.aggregate([
      {
        $group: {
          _id: '$productName',
          totalQuantity: { $sum: '$quantitySold' }
        }
      }
    ]);

    res.json({
      categoryRevenue,
      productQuantity
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

module.exports = router;