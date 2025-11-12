# ShopEase - E-commerce Platform

## 🌐 Live Demo
**Frontend URL:** [https://shopease-frontend.netlify.app](https://shopease-frontend.netlify.app)

## 📂 Repository
**GitHub Repository:** [https://github.com/dev3306-ai/ShopEase.git](https://github.com/dev3306-ai/ShopEase.git)

## 📋 Project Proposal

### Overview
ShopEase is a modern e-commerce platform built with React.js frontend and Node.js backend, designed to provide a seamless online shopping experience for users and efficient management tools for administrators.

### Objectives
- Create a user-friendly e-commerce platform with modern UI/UX
- Implement secure user authentication and authorization
- Provide comprehensive product catalog management
- Enable smooth shopping cart and checkout functionality
- Ensure responsive design for all devices

### Key Features
- **User Authentication**: Secure signup/login with JWT tokens
- **Product Catalog**: Browse and search products with filtering options
- **Shopping Cart**: Add, remove, and manage items in cart
- **User Dashboard**: Profile management and order history
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Secure Backend**: RESTful API with MongoDB integration

### Technology Stack

#### Frontend
- **Framework**: React.js 19.1.1
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS3 with responsive design
- **Deployment**: Netlify

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Cross-Origin Resource Sharing enabled
- **Deployment**: Render

### Project Structure
```
shopease/
├── shopease-frontend/          # React.js frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── css/               # Styling files
│   │   └── assets/            # Static assets
│   └── public/                # Public files
└── shopease-backend/          # Node.js backend API
    ├── server.js              # Main server file
    └── package.json           # Backend dependencies
```

### Development Timeline
1. **Phase 1**: Project setup and basic authentication (Completed)
2. **Phase 2**: Product catalog and database integration (In Progress)
3. **Phase 3**: Shopping cart functionality
4. **Phase 4**: Checkout and payment integration
5. **Phase 5**: Testing and deployment optimization

### Installation & Setup

#### Frontend
```bash
cd shopease-frontend
npm install
npm run dev
```

#### Backend
```bash
cd shopease-backend
npm install
npm start
```

### Environment Variables
Create `.env` file in backend directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3001
```

### API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /` - Health check

### Future Enhancements
- Payment gateway integration
- Admin dashboard for product management
- Order tracking system
- Product reviews and ratings
- Email notifications
- Advanced search and filtering

### Contributors
- Developer: [Your Name]
- Course: Capstone Project Semester 3

---
*This project is developed as part of the Capstone Project for Semester 3.*
