import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Orders.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      let filteredOrders = localOrders;
      if (statusFilter) {
        filteredOrders = localOrders.filter(order => 
          order.status.toLowerCase() === statusFilter.toLowerCase()
        );
      }
      
      setOrders(filteredOrders);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    fetchOrders();
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.filter(order => order.id !== id);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      fetchOrders();
    }
  };

  const openModal = (order) => {
    setEditingOrder(order);
    setShowModal(true);
  };

  return (
    <div className="orders-page">
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

      <div className="orders-container">
        <div className="orders-header">
          <h1>Order Management</h1>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="status-filter"
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : (
          <>
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order.id}</span>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                    <p><strong>Items:</strong> {order.items.length} product(s)</p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="order-items-preview">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="order-item-mini">
                        <img src={item.thumbnail} alt={item.title} />
                        <span>{item.quantity}x</span>
                      </div>
                    ))}
                    {order.items.length > 3 && <span>+{order.items.length - 3} more</span>}
                  </div>
                  <div className="order-actions">
                    <button onClick={() => openModal(order)} className="edit-btn">View Details</button>
                  </div>

                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                <span className="page-info">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showModal && editingOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> #{editingOrder.id}</p>
            <p><strong>Status:</strong> {editingOrder.status}</p>
            <p><strong>Total:</strong> ${editingOrder.totalAmount.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(editingOrder.date).toLocaleString()}</p>
            <h3>Items:</h3>
            <div className="order-items-list">
              {editingOrder.items.map((item, i) => (
                <div key={i} className="order-item-detail">
                  <img src={item.thumbnail} alt={item.title} style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                  <div>
                    <p><strong>{item.title}</strong></p>
                    <p>Quantity: {item.quantity} × ${item.price}</p>
                    <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
