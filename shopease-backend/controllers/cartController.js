const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }
    
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    
    await cart.save();
    
    // Populate product details for response
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });
    
    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    
    cart.items.pull(itemId);
    await cart.save();
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
