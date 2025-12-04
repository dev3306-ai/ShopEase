import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Reviews.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/reviews?page=${currentPage}&limit=10`);
      setReviews(response.data.reviews || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/reviews/${editingReview._id}`, formData);
      fetchReviews();
      closeModal();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`${API_URL}/api/reviews/${id}`);
        fetchReviews();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const openModal = (review) => {
    setEditingReview(review);
    setFormData({
      rating: review.rating,
      comment: review.comment
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingReview(null);
  };

  return (
    <div className="reviews-page">
      <nav className="reviews-nav">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <svg className="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">Shop<span className="logo-accent">Ease</span></span>
          </Link>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Shop</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
            <Link to="/reviews" className="nav-link">Reviews</Link>
          </nav>
        </div>
      </nav>

      <div className="reviews-container">
        <h1>Reviews Management</h1>

        {loading ? (
          <div className="loading">Loading reviews...</div>
        ) : (
          <>
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div className="review-rating">
                      {'⭐'.repeat(review.rating)}
                    </div>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <div className="review-meta">
                    <span>By: {review.userId?.name || 'Anonymous'}</span>
                    <span>Product: {review.productId?.name || 'N/A'}</span>
                  </div>
                  <div className="review-actions">
                    <button onClick={() => openModal(review)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(review._id)} className="delete-btn">Delete</button>
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

      {showModal && editingReview && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Review</h2>
            <form onSubmit={handleSubmit}>
              <label>Rating:</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
              <label>Comment:</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
