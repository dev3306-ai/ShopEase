import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/HomePage.css";

function HomePage({ token, onLogout }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=20");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data.products);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleProductClick = (product) => {
    setShowResults(false);
    setSearchQuery("");
    navigate(`/products?search=${encodeURIComponent(product.title)}`);
  };

  const handleLogout = () => {
    setUser(null);
    onLogout();
    navigate("/");
  };

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=500&fit=crop",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop",
    },
    {
      name: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=500&fit=crop",
    },
    {
      name: "Sports & Fitness",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=500&fit=crop",
    },
    {
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    },
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=500&fit=crop",
    },
    {
      name: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop",
    },
    {
      name: "Automotive",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=500&fit=crop",
    },
    {
      name: "Health",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=500&fit=crop",
    },
    {
      name: "Jewelry",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    },
    {
      name: "Pet Supplies",
      image:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=500&fit=crop",
    },
    {
      name: "Office",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop",
    },
    {
      name: "Garden",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=500&fit=crop",
    },
    {
      name: "Music",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=500&fit=crop",
    },
    {
      name: "Food",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop",
    },
  ];

  return (
    <div className="homepage">
      {/* Top Info Bar */}
      <div className="top-info-bar">
        <p>
          Free shipping on orders over $50 • 30-day returns • Shop with
          confidence
        </p>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-top">
          <Link to="/" className="header-logo">
            <span className="logo-text">
              Shop<span className="logo-accent">Ease</span>
            </span>
          </Link>
          <div className="header-search">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchInput}
                onFocus={() => searchQuery && setShowResults(true)}
                className="header-search-input"
              />
              <button className="header-search-btn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  color="black"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              {showResults && searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => handleProductClick(product)}
                    >
                      <img src={product.thumbnail} alt={product.title} />
                      <div className="search-result-info">
                        <p className="search-result-title">{product.title}</p>
                        <p className="search-result-price">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="header-icons">
            {user ? (
              <Link to="/account" className="auth-btn">
                Account
              </Link>
            ) : (
              <>
                <Link to="/login" className="auth-btn">
                  Login
                </Link>
                <Link to="/signup" className="auth-btn signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        <nav className="main-navigation">
          <Link to="/products" className="nav-link">
            All Products
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </nav>
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-label">New Arrivals</span>
            <h1 className="hero-heading">Discover Amazing Products</h1>
            <p className="hero-description">
              Shop the latest collection of premium quality products across all
              categories
            </p>
            <Link to="/products" className="hero-button">
              Shop Collection
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800"
              alt="Collection"
            />
          </div>
        </section>

        {/* Our Products Categories */}
        <section className="categories-section">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our wide range of products across multiple categories</p>
          </div>
          <div className="categories-carousel">
            {categories.map((cat, i) => (
              <Link
                to={`/products?category=${cat.name.toLowerCase()}`}
                key={i}
                className="category-item"
              >
                <div className="category-image">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <span className="category-label">{cat.name.toUpperCase()}</span>
                <h3 className="category-name">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Product */}
        <section className="featured-product">
          <div className="featured-content">
            <h2>Featured Products of the Month</h2>
            <p className="featured-tagline">
              Hand-picked selections just for you
            </p>
            <div className="featured-variants">
              {products.slice(12, 15).map((product, i) => (
                <div
                  key={product.id}
                  className="variant-card"
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {i === 0 && <span className="variant-badge">Exclusive</span>}
                  <img src={product.thumbnail} alt={product.title} />
                  <p className="variant-name">{product.title}</p>
                  <p className="variant-price">${product.price}</p>
                </div>
              ))}
            </div>
            <Link to="/products" className="featured-cta">
              Shop Now
            </Link>
          </div>
        </section>

        {/* Best-Sellers */}
        <section className="bestsellers-section">
          <div className="section-header">
            <h2>Best-Sellers</h2>
            <p>A curated selection of our top-selling products</p>
          </div>
          <div className="products-grid">
            {products.slice(0, 8).map((product, i) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                {i <= 2 && <span className="product-badge">NEW</span>}
                {product.stock < 10 && (
                  <span className="product-badge low-stock">LOW STOCK</span>
                )}
                <img src={product.thumbnail} alt={product.title} />
                <p className="product-brand">{product.brand}</p>
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            ))}
          </div>
          <Link to="/products" className="view-all-link">
            View All →
          </Link>
        </section>

        {/* New In */}
        <section className="newin-section">
          <div className="section-header">
            <h2>New In</h2>
            <p>Freshly added must-haves</p>
          </div>
          <div className="products-grid">
            {products.slice(8, 12).map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <span className="product-badge">NEW</span>
                <img src={product.thumbnail} alt={product.title} />
                <p className="product-brand">{product.brand}</p>
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            ))}
          </div>
          <Link to="/products?new=true" className="view-all-link">
            View All →
          </Link>
        </section>

        {/* Store Section */}
        <section className="store-section">
          <div className="store-content">
            <h2>Visit Our Store</h2>
            <p className="store-subtitle">Experience shopping in person</p>
            <div className="store-hours">
              <p>
                <strong>Store Hours:</strong>
              </p>
              <p>Monday – Saturday: 9:00 AM – 9:00 PM</p>
              <p>Sunday: 10:00 AM – 6:00 PM</p>
            </div>
            <p className="store-address">123 Shopping Plaza, Main Street</p>
            <a href="#" className="store-link">
              View Location on Map →
            </a>
          </div>
          <div className="store-image">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
              alt="Store"
            />
          </div>
        </section>

        {/* Value Proposition */}
        <section className="mission-section">
          <h2 className="mission-statement">Quality Products for Everyone</h2>
          <p className="mission-tagline">
            Your trusted online shopping destination — 24/7
          </p>

          <div className="mission-grid">
            <div className="mission-card">
              <h3>Quality Guaranteed</h3>
              <p>
                Every product carefully selected and verified for excellence
              </p>
            </div>
            <div className="mission-card">
              <h3>Wide Selection</h3>
              <p>Thousands of products across multiple categories</p>
            </div>
            <div className="mission-card">
              <h3>Best Prices</h3>
              <p>Competitive pricing with regular deals and discounts</p>
            </div>
            <div className="mission-card">
              <h3>Always Available</h3>
              <p>Shop anytime, anywhere with 24/7 online access</p>
            </div>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Fair Pricing</h3>
              <p>Competitive prices all year round, no inflated markups</p>
            </div>
            <div className="benefit-card">
              <h3>Fast Delivery</h3>
              <p>24h dispatch with reliable shipping partners</p>
            </div>
            <div className="benefit-card">
              <h3>Return & Exchange</h3>
              <p>30-day return window with free exchange shipping</p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-section">
          <div className="newsletter-card">
            <h2>10% off on your first order</h2>
            <p>
              Subscribe to be first to receive new drops, restocks, and
              exclusive promotions
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </section>

        {/* Browse Categories */}
        <section className="browse-section">
          <h2>Browse All Categories</h2>
          <p>Explore our complete range of products across all departments</p>
          <div className="browse-grid">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/products?category=${cat.name.toLowerCase()}`}
                className="browse-link"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-col">
              <h4>Shop</h4>
              <Link to="/products">All Products</Link>
              <Link to="/products?new=true">New Arrivals</Link>
              <Link to="/products?sale=true">Sale</Link>
              <Link to="/products?featured=true">Featured</Link>
            </div>
            <div className="footer-col">
              <h4>Information</h4>
              <Link to="/returns">Initiate a Return</Link>
              <Link to="/help">Help & Questions</Link>
              <Link to="/join">Join Us</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/legal">Legal</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
            <div className="footer-col">
              <h4>Our Mission</h4>
              <div className="footer-rating">
                <p>★★★★★ 4.9/5</p>
                <p>Based on 2,500+ reviews</p>
              </div>
              <div className="footer-social">
                <a href="#">Instagram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="payment-methods">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>PayPal</span>
              <span>Apple Pay</span>
            </div>
            <p>© 2024 ShopEase • Your trusted online shopping destination</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
