// Import required packages
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Product structure (schema)
const productSchema = new mongoose.Schema({
  name: String,           // Product name
  description: String,    // Product description
  price: Number,          // Product price
  category: String,       // Category (electronics, fashion, etc.)
  image: String,          // Image URL
  stock: Number,          // Available quantity
  rating: Number,         // Rating (1-5)
}, { timestamps: true });  // Auto-add createdAt and updatedAt

// Define Category structure (schema)
const categorySchema = new mongoose.Schema({
  name: String,           // Category name
  description: String,    // Category description
  icon: String,           // Icon name
}, { timestamps: true });

// Create models from schemas
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

// Main function to fetch and save products
async function seedFromAPI() {
  try {
    // Step 1: Fetch products from external API
    console.log('Fetching products from DummyJSON API...');
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();
    const apiProducts = data.products; // Array of 100 products

    // Step 2: Clear old data from database
    await Product.deleteMany({});   // Delete all products
    await Category.deleteMany({});  // Delete all categories
    console.log('Cleared existing data');

    // Step 3: Map API categories to our 4 main categories
    // This converts many API categories into our simple 4 categories
    const categoryMap = {
      'smartphones': 'electronics',      // Phone → Electronics
      'laptops': 'electronics',          // Laptop → Electronics
      'fragrances': 'lifestyle',         // Perfume → Lifestyle
      'skincare': 'lifestyle',           // Skincare → Lifestyle
      'groceries': 'lifestyle',          // Food → Lifestyle
      'home-decoration': 'lifestyle',    // Decor → Lifestyle
      'furniture': 'lifestyle',          // Furniture → Lifestyle
      'tops': 'fashion',                 // Tops → Fashion
      'womens-dresses': 'fashion',       // Dresses → Fashion
      'womens-shoes': 'fashion',         // Shoes → Fashion
      'mens-shirts': 'fashion',          // Shirts → Fashion
      'mens-shoes': 'fashion',           // Shoes → Fashion
      'mens-watches': 'fashion',         // Watches → Fashion
      'womens-watches': 'fashion',       // Watches → Fashion
      'womens-bags': 'fashion',          // Bags → Fashion
      'womens-jewellery': 'fashion',     // Jewelry → Fashion
      'sunglasses': 'fashion',           // Sunglasses → Fashion
      'automotive': 'electronics',       // Auto → Electronics
      'motorcycle': 'electronics',       // Bike → Electronics
      'lighting': 'lifestyle'            // Lights → Lifestyle
    };

    // Step 4: Create our 4 main categories
    const categories = [
      { name: 'electronics', description: 'Electronic devices and gadgets', icon: 'Tech' },
      { name: 'fashion', description: 'Clothing and accessories', icon: 'Style' },
      { name: 'lifestyle', description: 'Home and lifestyle products', icon: 'Home' },
      { name: 'fitness', description: 'Fitness and sports equipment', icon: 'Sport' },
    ];
    await Category.insertMany(categories); // Save to database
    console.log('Categories inserted');

    // Step 5: Transform API products to our format
    const products = apiProducts.map(p => ({
      externalId: p.id,
      name: p.title,
      description: p.description,
      price: p.price,
      category: categoryMap[p.category] || 'lifestyle',
      image: p.thumbnail || p.images[0],
      thumbnail: p.thumbnail,
      images: p.images,
      brand: p.brand,
      stock: p.stock,
      rating: p.rating
    }));

    // Step 6: Save all products to database
    await Product.insertMany(products);
    console.log(`${products.length} products inserted from API`);

    console.log('[SUCCESS] Database seeded successfully with real product data!');
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error('[ERROR] Error seeding database:', error);
    process.exit(1); // Exit with error
  }
}

// Run the seed function
seedFromAPI();
