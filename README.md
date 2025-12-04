# ShopEase - Full-Stack E-Commerce Application

A comprehensive e-commerce platform with complete CRUD operations, advanced filtering, pagination, search, sorting, and Google OAuth authentication.

## 🎯 Key Features

### ✅ Complete CRUD Operations (8 Total)
- **Products**: Create, Read, Update, Delete
- **Categories**: Create, Read, Update, Delete  
- **Orders**: Create, Read, Update, Delete
- **Reviews**: Create, Read, Update, Delete

### 🔍 Advanced Features (All via Backend API)
- **Pagination**: All list views support pagination
- **Search**: Real-time product search by name and description
- **Sorting**: Sort by newest, price (asc/desc), name
- **Filtering**: Category, price range, order status filters

### 🔐 Authentication
- Regular email/password authentication
- Google OAuth "Continue with Google" integration
- JWT token-based sessions
- Protected routes

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- MongoDB Atlas account (connection string in .env)
- Google OAuth credentials (optional, for Google login)

### Installation

1. **Clone and setup backend:**
```bash
cd shopease-backend
npm install
npm run seed    # Populate database with sample data
npm start       # Start backend server on port 3001
```

2. **Setup frontend (in new terminal):**
```bash
cd shopease-frontend
npm install
npm run dev     # Start frontend on port 5173
```

3. **Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📱 Application Pages

### Public Pages
- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Full product catalog with search, filter, sort, pagination
- **Login** (`/login`) - Login with email/password or Google
- **Signup** (`/signup`) - Register with email/password or Google

### Admin Pages
- **Admin Products** (`/admin/products`) - Manage products (CRUD operations)
- **Orders** (`/orders`) - View and manage orders
- **Reviews** (`/reviews`) - View and manage product reviews

## 🎬 Testing the Features

### 1. Products Management
1. Visit http://localhost:5173/products
2. **Search**: Type "wireless" in search bar
3. **Filter**: Click "Electronics" category
4. **Sort**: Select "Price: Low to High"
5. **Price Filter**: Click "More Filters", set min/max price
6. **Pagination**: Navigate through pages
7. Click "Admin" button to access product management
8. **Create**: Click "+ Add Product", fill form, save
9. **Update**: Click "Edit" on any product, modify, save
10. **Delete**: Click "Delete" on any product

### 2. Orders Management
1. Visit http://localhost:5173/orders
2. **Filter**: Select status from dropdown (Pending, Processing, etc.)
3. **Update**: Click "Update Status", select new status
4. **Delete**: Click "Delete" button
5. **Pagination**: Navigate through order pages

### 3. Reviews Management
1. Visit http://localhost:5173/reviews
2. **Update**: Click "Edit", change rating/comment, save
3. **Delete**: Click "Delete" button
4. **Pagination**: Navigate through review pages

### 4. Authentication
1. Visit http://localhost:5173/signup
2. **Regular Signup**: Fill form and submit
3. **Google Signup**: Click "Continue with Google"
4. **Login**: Use email/password or Google OAuth

## 📊 Database Schema

### Products
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number
}
```

### Orders
```javascript
{
  userId: ObjectId,
  products: [{ productId, quantity, price }],
  totalAmount: Number,
  status: String,
  shippingAddress: String
}
```

### Reviews
```javascript
{
  productId: ObjectId,
  userId: ObjectId,
  rating: Number (1-5),
  comment: String
}
```

### Categories
```javascript
{
  name: String,
  description: String,
  icon: String
}
```

## 🛠️ Technology Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Google Auth Library
- bcryptjs

**Frontend:**
- React 19
- React Router DOM
- Axios
- CSS3
- Google Identity Services

## 📝 API Endpoints

### Products
- `GET /api/products` - List products (pagination, search, sort, filter)
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - List orders (pagination, filter by status)
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Reviews
- `GET /api/reviews` - List reviews (pagination)
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth

## 🎯 Requirements Fulfilled

✅ **Minimum 2 Create operations** - Products, Categories, Orders, Reviews (4 total)
✅ **Minimum 2 Read operations** - All resources with pagination (4 total)
✅ **Minimum 2 Update operations** - All resources (4 total)
✅ **Minimum 2 Delete operations** - All resources (4 total)
✅ **Auth-related CRUD does not count** - Separate resources used
✅ **Pagination through backend API** - Implemented on all list views
✅ **Searching through backend API** - Product search implemented
✅ **Sorting through backend API** - Multiple sort options
✅ **Filtering through backend API** - Category, price, status filters
✅ **Google OAuth integration** - "Continue with Google" on login/signup
✅ **All functionality working in website** - End-to-end implementation

## 📚 Documentation

- **FEATURES.md** - Detailed feature documentation
- **QUICKSTART.md** - Quick start testing guide
- **GOOGLE_OAUTH_SETUP.md** - Google OAuth configuration guide

## 🎨 Sample Data

The database includes:
- 16 products across 4 categories
- Electronics, Fashion, Lifestyle, Fitness categories
- Sample images from Unsplash

## 🔧 Environment Variables

**Backend (.env):**
```
PORT=3001
JWT_SECRET=your-jwt-secret
MONGODB_URI=your-mongodb-uri
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🎓 Project Structure

```
Capstone Sem 3/
├── shopease-backend/
│   ├── server.js           # Main server file with all routes
│   ├── seedData.js         # Database seeding script
│   ├── package.json
│   └── .env
├── shopease-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Products.jsx        # Product listing
│   │   │   ├── AdminProducts.jsx   # Product management
│   │   │   ├── Orders.jsx          # Order management
│   │   │   ├── Reviews.jsx         # Review management
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Signup.jsx          # Signup page
│   │   │   ├── GoogleAuth.jsx      # Google OAuth component
│   │   │   └── HomePage.jsx        # Landing page
│   │   ├── css/                    # Styling files
│   │   └── App.jsx                 # Main app component
│   ├── package.json
│   └── .env
├── FEATURES.md             # Detailed features documentation
├── QUICKSTART.md           # Quick start guide
├── GOOGLE_OAUTH_SETUP.md   # OAuth setup instructions
└── README.md               # This file
```

## 🌟 Highlights

- **Professional UI/UX** - Clean, modern design with smooth animations
- **Responsive Design** - Works on desktop and mobile
- **Real-time Updates** - Changes reflect immediately
- **Error Handling** - Proper error messages and loading states
- **Data Validation** - Form validation and required fields
- **Scalable Architecture** - Modular, maintainable code
- **Complete Documentation** - Comprehensive guides and docs

## 📞 Support

For issues or questions:
1. Check the QUICKSTART.md for common solutions
2. Verify environment variables are set correctly
3. Ensure MongoDB connection is active
4. Check that both servers are running

## 🎉 Success Criteria

All requirements have been successfully implemented:
- ✅ 8 CRUD operations (2 per resource × 4 resources)
- ✅ Pagination on all list endpoints
- ✅ Search functionality via API
- ✅ Sort functionality via API
- ✅ Filter functionality via API
- ✅ Google OAuth integration
- ✅ All features working end-to-end in the website

---

**Built with ❤️ for Capstone Project**
