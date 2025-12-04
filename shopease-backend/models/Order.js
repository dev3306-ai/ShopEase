const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
      productId: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
