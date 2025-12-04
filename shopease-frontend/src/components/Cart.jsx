import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    const order = {
      id: Date.now(),
      items: cartItems,
      totalAmount: calculateTotal(),
      status: 'Pending',
      date: new Date().toISOString(),
    };
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    localStorage.removeItem('cart');
    navigate('/orders');
  };

  if (loading) return <div className="loading">Loading cart...</div>;

  return (
    <div className="cart-page">
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
              <Link to="/cart" className="nav-link">Cart</Link>
            </nav>
          </div>
        </div>
      </nav>

      <div className="cart-container">
        <h1>Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products" className="continue-shopping-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.thumbnail || item.image} 
                    alt={item.title} 
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                  </div>
                  <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
