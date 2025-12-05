**ShopEase – An E-Commerce Product Management System**

## 🌐 Live Demo

**Frontend**: https://shop-ease-umber.vercel.app/
**Backend API**: https://shopease-jfjg.onrender.com

---

## 1. Overview

### 1.1 Product Summary

ShopEase is a modern, cloud-based e-commerce platform for small and medium-sized businesses. It simplifies product management, inventory tracking, order processing, and customer engagement through an intuitive web interface.

The system ensures real-time product visibility, reduces manual errors in inventory management, and helps businesses optimize their online sales operations with advanced search, filtering, and sorting capabilities.

### 1.2 Primary Users

- **User (Customer)** - Shopping access for browsing and purchasing products

---

## 2. Goal & Objectives

### 2.1 Primary Goals

- Prevent stockouts & overstocking
- Centralize all product & order data
- Provide accurate real-time product information
- Improve customer shopping experience

### 2.2 Key Objectives

- Reduce manual product tracking
- Provide web-accessible product catalog
- Improve order management
- Deliver actionable insights

---

## 3. User Roles & Permissions

### 3.1 Admin

- Manage products (create/update/delete)
- Manage categories (create/update/delete)
- Manage orders (view/update/delete)
- Manage reviews (view/delete)
- Full CRUD on all resources
- Access to dashboard analytics

### 3.2 User (Customer)

- View products
- Search, filter, and sort products
- Add products to cart
- Place orders
- Write and edit reviews
- View order history
- Cannot delete products, categories, or other users' data

---

## 4. Core Features

### 4.1 Authentication & Authorization

**Features:**

- JWT-based login/signup
- Google OAuth integration ("Continue with Google")
- Role-based access control (Admin/User)
- Session expiration and refresh
- Password hashing with bcrypt

**User Flows:**

- Login → Home/Dashboard
- Admin can manage all resources
- Logout clears session tokens

### 4.2 Product Management

**Admin Features:**

- Create new product
- Update product details
- Delete product
- Assign product to category
- Set product stock levels

**User Features:**

- View all products
- Search products by name/description
- Filter by category and price range
- Sort by price, name, newest
- View detailed product information

**Product Fields:**

```
id, name, description, price, category, image, stock, rating, createdAt
```

### 4.3 Advanced Search & Filtering

**Features:**

- Real-time product search
- Category-based filtering
- Price range filtering
- Multi-criteria sorting
- Pagination for performance

**Capabilities:**

- Instant search results via backend API
- Case-insensitive matching
- Partial text matching
- Combined filters

### 4.4 Shopping Cart Management

**Features:**

- Add/remove products from cart
- Update product quantities
- Real-time cart total calculation
- Persistent cart storage
- Cart item validation

**Cart Operations:**

- Add to cart with quantity
- Update quantities
- Remove items
- Clear cart
- View cart summary

### 4.5 Order Management

**Admin Features:**

- View all orders
- Filter orders by status
- Update order status (Pending, Processing, Shipped, Delivered)
- Delete orders
- View order details

**User Features:**

- Place new orders
- View order history
- Track order status
- View order details

**Order Fields:**

```
id, userId, products[], totalAmount, status, shippingAddress, createdAt
```

### 4.6 Review System

**Features:**

- Create product reviews with ratings (1-5 stars)
- Edit own reviews
- Delete reviews (admin/owner)
- View all reviews with pagination
- Average rating calculation

**Review Fields:**

```
id, productId, userId, rating, comment, createdAt
```

### 4.7 Category Management

**Admin Features:**

- Create categories
- Update category details
- Delete categories
- View all categories

**User Features:**

- View category list
- Filter products by category

**Category Fields:**

```
id, name, description, icon
```

---

## 5. Non-Functional Requirements

### 5.1 Performance

- API response time < 300ms
- Page load time < 2s

### 5.2 Security

- bcrypt password hashing
- JWT token expiry
- Role-based middleware
- Validation for input fields

### 5.3 Scalability

- Horizontally scalable (React + Node + MongoDB)
- Mongoose ODM ensures easy schema management

### 5.4 Reliability

- Proper error handling
- Consistent database transactions

---

## 6. Tech Stack

| Layer    | Technologies                                            |
| -------- | ------------------------------------------------------- |
| Frontend | React.js, CSS3, React Router, Axios                     |
| Backend  | Node.js, Express.js                                     |
| Database | MongoDB Atlas + Mongoose ODM                            |
| Auth     | JWT, Google OAuth 2.0                                   |
| Hosting  | Vercel (Frontend), Render (Backend), MongoDB Atlas (DB) |

### 6.1 Architecture

```
┌─────────────────┐
│   React.js      │ ← Frontend (Vite + CSS3)
│   + Vite        │
└────────┬────────┘
         │ HTTP/REST API
         ↓
┌─────────────────┐
│   Express.js    │ ← Backend API (JWT + Google OAuth)
│   + Node.js     │
└────────┬────────┘
         │ Mongoose ODM
         ↓
┌─────────────────┐
│  MongoDB Atlas  │ ← Database
└─────────────────┘
```

### 6.2 Frontend Technologies

- **React 19** - UI library
- **Vite** - Build tool
- **React Router v7** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling
- **Google Identity Services** - OAuth

### 6.3 Backend Technologies

- **Node.js** - Runtime
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Google Auth Library** - OAuth verification

---

## 7. API Endpoints

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google`

### Products

- `GET /api/products` → All users
- `POST /api/products` → Admin
- `GET /api/products/:id` → All users
- `PUT /api/products/:id` → Admin
- `DELETE /api/products/:id` → Admin

### Categories

- `GET /api/categories`
- `POST /api/categories` → Admin
- `PUT /api/categories/:id` → Admin
- `DELETE /api/categories/:id` → Admin

### Orders

- `GET /api/orders` → User & Admin
- `POST /api/orders` → User
- `GET /api/orders/:id` → User & Admin
- `PUT /api/orders/:id` → Admin
- `DELETE /api/orders/:id` → Admin

### Reviews

- `GET /api/reviews`
- `POST /api/reviews` → User
- `PUT /api/reviews/:id` → User (owner)
- `DELETE /api/reviews/:id` → User (owner) & Admin

### Cart

- `GET /api/cart` → User
- `POST /api/cart` → User
- `PUT /api/cart/:id` → User
- `DELETE /api/cart/:id` → User

---

## 8. Database Schema (Mongoose)

```javascript
model User {
  id        ObjectId  @id @default(auto)
  name      String
  email     String    @unique
  password  String
  googleId  String?
  role      String    @default("user") // "admin" | "user"
  createdAt DateTime  @default(now())
}

model Product {
  id          ObjectId  @id @default(auto)
  name        String
  description String
  price       Number
  category    String
  image       String
  stock       Number
  rating      Number
  createdAt   DateTime  @default(now())
}

model Order {
  id              ObjectId  @id @default(auto)
  userId          ObjectId  @ref(User)
  products        Array     // [{ productId, quantity, price }]
  totalAmount     Number
  status          String    // "Pending" | "Processing" | "Shipped" | "Delivered"
  shippingAddress String
  createdAt       DateTime  @default(now())
}

model Review {
  id        ObjectId  @id @default(auto)
  productId ObjectId  @ref(Product)
  userId    ObjectId  @ref(User)
  rating    Number    // 1-5
  comment   String
  createdAt DateTime  @default(now())
}

model Category {
  id          ObjectId  @id @default(auto)
  name        String
  description String
  icon        String
}
```

---

## 9. UI/UX Requirements

### 9.1 Pages

- Login Page
- Signup Page
- Home Page
- Products Page
- Product Details Page
- Cart Page
- Orders Page
- Reviews Page
- Admin Products Page (Admin only)
- Profile Page

### 9.2 UI Style

- Clean, modern e-commerce design
- CSS3 custom styling
- Mobile & tablet responsive
- Intuitive navigation

---

## 10. Development Roadmap (1 Month)

| Week   | Milestone            | Tasks                                          |
| ------ | -------------------- | ---------------------------------------------- |
| Week 1 | Backend Setup        | Auth, Products API, Orders API, Mongoose setup |
| Week 2 | Frontend Setup       | Login, Product pages, Cart functionality       |
| Week 3 | Core Features        | Orders, Reviews, Admin panel, Google OAuth     |
| Week 4 | Testing & Deployment | Bug fixes, optimization, deployment            |

---

## 11. Future Enhancements (Not for MVP but good for v2.0)

- Payment gateway integration (Stripe/PayPal)
- Email notifications for orders
- Product recommendations
- Wishlist functionality
- Advanced analytics dashboard
- Multi-language support
- Export reports (CSV, PDF)

---

## 12. Prerequisites & Setup

### 12.1 Prerequisites

- Node.js v16 or higher
- MongoDB Atlas account
- npm or yarn
- Git

### 12.2 Quick Start

#### 1. Clone Repository

```bash
git clone <your-repo-url>
cd "Capstone Sem 3"
```

#### 2. Backend Setup

```bash
cd shopease-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update MONGODB_URI and JWT_SECRET in .env

# Seed database
npm run seed

# Start backend server
npm start
```

Backend runs on **http://localhost:3001**

#### 3. Frontend Setup

```bash
cd shopease-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update VITE_API_URL in .env

# Start frontend server
npm run dev
```

Frontend runs on **http://localhost:5173**

#### 4. Access Application

Open browser and navigate to **http://localhost:5173**

**Demo Credentials:**

- Admin: `admin@shopease.com` / `password123`
- User: `user@shopease.com` / `password123`

---

## 13. Project Structure

```
Capstone Sem 3/
├── shopease-backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── reviewController.js
│   │   ├── categoryController.js
│   │   └── cartController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   ├── Category.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── cartRoutes.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── shopease-frontend/
    ├── src/
    │   ├── components/
    │   │   ├── HomePage.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── AdminProducts.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Reviews.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── GoogleAuth.jsx
    │   │   └── Navbar.jsx
    │   ├── css/
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json
```

---

## 14. Deployment

### 14.1 Backend (Render/Railway)

**Render:**

1. Push code to GitHub
2. Create Web Service on Render
3. Configure build: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### 14.2 Frontend (Vercel/Netlify)

**Vercel:**

1. Import GitHub repository
2. Framework: Vite
3. Build command: `npm run build`
4. Output: `dist`
5. Add `VITE_API_URL` environment variable
6. Deploy

### 14.3 Database (MongoDB Atlas)

**MongoDB Atlas:**

1. Create account at mongodb.com/cloud/atlas
2. Create new cluster
3. Copy connection string
4. Use in `MONGODB_URI`

---

## 15. Testing & Quality Assurance

### 15.1 Manual Testing

- Test authentication (login/signup)
- Test Google OAuth integration
- Test product CRUD operations
- Test search, filter, sort functionality
- Test cart operations
- Test order placement
- Test review system
- Test role-based permissions

### 15.2 API Testing

Use Postman/Thunder Client:

1. Import API collection
2. Set base URL
3. Test endpoints
4. Verify responses

---

## 16. Troubleshooting

### 16.1 Backend Issues

**Database Connection Failed:**

```bash
# Check MongoDB is running
# Verify MONGODB_URI in .env
# Test connection
```

**Port Already in Use:**

```bash
# Change PORT in .env
```

### 16.2 Frontend Issues

**Cannot Connect to API:**

- Check backend is running
- Verify `VITE_API_URL` in .env
- Check browser console for errors

**CORS Error:**

- Update CORS config in backend
- Add frontend URL to allowed origins

---

## 🎯 Final Summary

This PRD provides a professional-grade, startup-quality blueprint for ShopEase - a comprehensive e-commerce platform. The system is designed with clean architecture, clear role separation, and scalable technology choices suitable for real-world deployment.

**Key Differentiators:**

- ✅ Professional PRD structure
- ✅ Clear role-based permissions (Admin/User)
- ✅ Scalable tech stack
- ✅ Production-ready deployment strategy
- ✅ Comprehensive API design
- ✅ Future enhancement roadmap

---

## 17. Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)
- [Vite Documentation](https://vitejs.dev)

---

## 18. Contributing & Support

### 18.1 Contributing

This is a semester project. For contributions:

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

### 18.2 Support

For issues or questions:

1. Check documentation in `DEPLOYMENT.md`
2. Review troubleshooting sections
3. Check error logs
4. Create GitHub issue

---

## 19. License & Credits

### 19.1 License

MIT License - Feel free to use for learning purposes

### 19.2 Project Info

**Semester 3 Capstone Project**

- **Project**: ShopEase
- **Course**: Full-Stack Development
- **Duration**: 4 weeks

### 19.3 Acknowledgments

- React team for amazing library
- MongoDB team for excellent database
- Express.js community
- All open-source contributors

---

**⭐ If you find this project useful, please give it a star!**

**Made with ❤️ for Semester 3 Capstone Project**
