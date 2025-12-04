const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number,
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

// Sample data
const categories = [
  { name: 'electronics', description: 'Electronic devices and gadgets', icon: 'Tech' },
  { name: 'fashion', description: 'Clothing and accessories', icon: 'Style' },
  { name: 'lifestyle', description: 'Home and lifestyle products', icon: 'Home' },
  { name: 'fitness', description: 'Fitness and sports equipment', icon: 'Sport' },
];

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 199.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.5
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 30,
    rating: 4.7
  },
  {
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand for better posture',
    price: 49.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    stock: 100,
    rating: 4.3
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with 360-degree sound',
    price: 79.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    stock: 75,
    rating: 4.6
  },
  {
    name: 'Designer Jacket',
    description: 'Premium leather jacket with modern design',
    price: 249.99,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    stock: 25,
    rating: 4.8
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning',
    price: 129.99,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 60,
    rating: 4.5
  },
  {
    name: 'Casual T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 29.99,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 150,
    rating: 4.2
  },
  {
    name: 'Denim Jeans',
    description: 'Classic fit denim jeans with stretch comfort',
    price: 89.99,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    stock: 80,
    rating: 4.4
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 89.99,
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    stock: 40,
    rating: 4.6
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature',
    price: 39.99,
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    stock: 90,
    rating: 4.3
  },
  {
    name: 'Plant Pot Set',
    description: 'Set of 3 ceramic plant pots with drainage',
    price: 34.99,
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
    stock: 120,
    rating: 4.5
  },
  {
    name: 'Wall Clock',
    description: 'Modern minimalist wall clock with silent movement',
    price: 44.99,
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500',
    stock: 65,
    rating: 4.4
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap',
    price: 39.99,
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 85,
    rating: 4.7
  },
  {
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set 5-25 lbs',
    price: 149.99,
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
    stock: 35,
    rating: 4.8
  },
  {
    name: 'Resistance Bands',
    description: 'Set of 5 resistance bands with different strengths',
    price: 24.99,
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
    stock: 110,
    rating: 4.5
  },
  {
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle 32oz',
    price: 29.99,
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    stock: 200,
    rating: 4.6
  },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    await Category.insertMany(categories);
    console.log('Categories inserted');

    // Insert products
    await Product.insertMany(products);
    console.log('Products inserted');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
