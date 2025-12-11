const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  salesDate: {
    type: Date,
    required: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  quantitySold: {
    type: Number,
    required: true,
    min: 0
  },
  revenue: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);