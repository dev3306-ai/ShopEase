import { useState } from 'react';
import '../css/Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🛒</span>
            ShopEase
          </div>
          <nav className="header-nav">
            <button className="nav-btn active">Dashboard</button>
            <button className="nav-btn">Explore</button>
            <button className="nav-btn">Categories</button>
            <button className="nav-btn">Website</button>
          </nav>
        </div>
        <div className="header-right">
          <div className="orders-summary">37 Orders (Last 7 days)</div>
          <button className="header-icon">🔍</button>
          <button className="header-icon">🛒</button>
          <button className="header-icon">🔔</button>
          <div className="user-profile">
            <span>{user?.name || 'User'}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h4>Main Navigation</h4>
            <div className="sidebar-item active">
              <span className="sidebar-icon">📊</span>
              Popular Products
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">🔍</span>
              Explore New
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">👕</span>
              Clothing & Footwear
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">🏠</span>
              Home & Living
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">💡</span>
              Inspiration
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Quick Actions</h4>
            <div className="sidebar-item">
              <span className="sidebar-icon">➕</span>
              Add Product
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">👥</span>
              Add Member
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Recent Orders</h4>
            <div className="recent-order">Order #1234 - $89.99</div>
            <div className="recent-order">Order #1235 - $156.50</div>
            <div className="recent-order">Order #1236 - $45.00</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <h1>Explore</h1>
            <div className="filter-bar">
              <div className="filter-buttons">
                {['All', 'Men', 'Women'].map(filter => (
                  <button 
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="filter-icons">
                <button className="filter-icon">🔧</button>
                <button className="filter-icon">🔍</button>
              </div>
            </div>
          </div>

          {/* Promo Banners */}
          <div className="promo-banners">
            <div className="promo-card green">
              <h3>Get Up To 60% Off</h3>
              <button className="promo-btn">Get Discount</button>
            </div>
            <div className="promo-card yellow">
              <h3>Winter Weekend – Keep It Casual</h3>
            </div>
          </div>

          {/* Product Grid */}
          <div className="products-grid">
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop" alt="Sandals" />
              <div className="color-dots">
                <span className="dot brown"></span>
                <span className="dot black"></span>
                <span className="dot blue"></span>
              </div>
              <div className="product-info">
                <span className="category">Footwear</span>
                <h4>WMX Rubber Sandals</h4>
                <div className="product-footer">
                  <span className="price">$45</span>
                  <button className="wishlist">❤️</button>
                </div>
              </div>
            </div>

            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1506629905607-d405b7a82d42?w=300&h=400&fit=crop" alt="Joggers" />
              <div className="color-dots">
                <span className="dot grey"></span>
                <span className="dot navy"></span>
              </div>
              <div className="product-info">
                <span className="category">Clothing</span>
                <h4>SuperSkin Joggers</h4>
                <div className="product-footer">
                  <span className="price">$89</span>
                  <button className="wishlist">❤️</button>
                </div>
              </div>
            </div>

            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop" alt="Hoodie" />
              <div className="color-dots">
                <span className="dot red"></span>
                <span className="dot black"></span>
              </div>
              <div className="product-info">
                <span className="category">Streetwear</span>
                <h4>Bold Streetwear Hoodie</h4>
                <div className="product-footer">
                  <span className="price">$125</span>
                  <button className="wishlist">❤️</button>
                </div>
              </div>
            </div>

            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop" alt="Fashion" />
              <div className="color-dots">
                <span className="dot pink"></span>
                <span className="dot white"></span>
              </div>
              <div className="product-info">
                <span className="category">Fashion</span>
                <h4>Premium Collection</h4>
                <div className="product-footer">
                  <span className="price">$199</span>
                  <button className="wishlist">❤️</button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Cards */}
          <div className="featured-cards">
            <div className="feature-card peach">
              <div className="feature-content">
                <h3>Avail Offers</h3>
                <img src="https://images.unsplash.com/photo-1494790108755-2616c669-b6c2?w=200&h=250&fit=crop" alt="Model" />
              </div>
            </div>
            <div className="feature-card white">
              <h3>Favourites</h3>
              <div className="mini-products">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop" alt="Product" />
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop" alt="Product" />
              </div>
              <button className="see-all-btn">See All</button>
            </div>
          </div>

          {/* Large Feature Section */}
          <div className="large-feature">
            <div className="feature-text">
              <h2>Bring Bold Fashion</h2>
              <p>Layers on Layers</p>
            </div>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" alt="Fashion Model" />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🛒</span>
            ShopEase
          </div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Help Center</a>
          </div>
          <div className="social-icons">
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;