import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Wishlist.css';

function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const items = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(items);
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <div className="wishlist-page">
      <nav className="products-nav">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <span className="logo-text">Shop<span className="logo-accent">Ease</span></span>
            </Link>
            <nav className="main-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/products" className="nav-link">Shop</Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <Link to="/wishlist" className="nav-link">Wishlist</Link>
              <Link to="/cart" className="nav-link">Cart</Link>
            </nav>
          </div>
        </div>
      </nav>

      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        <p className="wishlist-count">{wishlist.length} items</p>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h3>Your wishlist is empty</h3>
            <p>Save your favorite items here</p>
            <Link to="/products" className="shop-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-card">
                <button 
                  className="remove-wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                >
                  ×
                </button>
                <div className="wishlist-image" onClick={() => navigate(`/product/${item.id}`)} style={{cursor: 'pointer'}}>
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="wishlist-info">
                  <h3>{item.title}</h3>
                  <p className="wishlist-price">${item.price}</p>
                  <button onClick={() => addToCart(item)} className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
