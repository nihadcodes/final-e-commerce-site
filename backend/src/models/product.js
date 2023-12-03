const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shotCode: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  image: { type: String},
  isBestAchieved: { type: Boolean, default: false },
  createdDate: { type: Date, required: true },
  
  origin: {
    type: String,
    required: true,
    enum: ['Local', 'Imported'] 
  },
  category: {
    type: String,
    required: true,
    enum: ['Mobile', 'Food', 'Cloths'] 
  },

  image: {
    type: String, 
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
