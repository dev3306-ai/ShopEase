import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/HomePage.css";

function HomePage({ token, onLogout }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    onLogout();
    navigate("/");
  };

  return (
    <div className="homepage">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>ShopEase</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Home
          </Link>
          <Link to="/electronics" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 2v2h3v16H4V4h3V2h2v2h6V2h2zm-5 6H7v5h5V8z"/>
            </svg>
            Electronics
          </Link>
          <Link to="/fashion" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Fashion
          </Link>
          <Link to="/home-garden" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Home & Garden
          </Link>
          <Link to="/deals" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.79 21L3 11.21V2H11.21L21 11.79L12.79 21ZM7 6C7.55 6 8 5.55 8 5S7.55 4 7 4 6 4.45 6 5 6.45 6 7 6Z"/>
            </svg>
            Deals
          </Link>
          {user && (
            <>
              <Link to="/account" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Account
              </Link>
              <Link to="/cart" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                Cart
              </Link>
              <button onClick={handleLogout} className="nav-item logout-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Logout
              </button>
            </>
          )}
        </nav>
      </aside>
      
      {!user && (
        <div className="top-nav">
          <div className="auth-buttons">
            <Link to="/login" className="nav-button secondary">Login</Link>
            <Link to="/signup" className="nav-button primary">Sign Up</Link>
          </div>
        </div>
      )}

      <main className="main-content">
        <section className="hero-banner">
          <div className="hero-content">
            <h1>Shop Smart, Live Better</h1>
            <p>Discover amazing products at unbeatable prices across all categories</p>
            <button className="cta-button">Shop Now</button>
          </div>
        </section>

        <section className="trending-section">
          <h2>Featured Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" alt="Product" />
              <h3>Wireless Headphones</h3>
              <p>Premium sound quality</p>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop" alt="Product" />
              <h3>Smartphone</h3>
              <p>Latest technology</p>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" alt="Product" />
              <h3>Smart Watch</h3>
              <p>Fitness tracking</p>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop" alt="Product" />
              <h3>Coffee Maker</h3>
              <p>Perfect morning brew</p>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop" alt="Product" />
              <h3>Fashion Jacket</h3>
              <p>Stylish and comfortable</p>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop" alt="Product" />
              <h3>Gaming Chair</h3>
              <p>Ergonomic design</p>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop" alt="Product" />
              <h3>Books Collection</h3>
              <p>Knowledge & entertainment</p>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop" alt="Product" />
              <h3>Running Shoes</h3>
              <p>Comfort & performance</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;