const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    externalId: { type: Number },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    thumbnail: { type: String },
    images: [{ type: String }],
    brand: { type: String },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
