import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../css/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      fetchRecommendations();
    }
    fetchReviews();
  }, [product]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${product.category}?limit=4`);
      const data = await response.json();
      setRecommendations(data.products.filter(p => p.id !== product.id).slice(0, 4));
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const fetchReviews = () => {
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const productReviews = allReviews.filter(r => r.productId === parseInt(id));
    setReviews(productReviews);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user) {
      alert('Please login to submit a review');
      navigate('/login');
      return;
    }

    const review = {
      id: Date.now(),
      productId: parseInt(id),
      productName: product.title,
      userId: user.id || user.email,
      userName: user.name || user.email,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    };

    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    allReviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(allReviews));
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="error">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <nav className="products-nav">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <span className="logo-text">
                Shop<span className="logo-accent">Ease</span>
              </span>
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

      <div className="product-detail-container">
        <div className="product-detail-grid">
          <div className="product-images">
            <div className="main-image-container">
              <button 
                className="image-nav-btn prev" 
                onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : (product.images?.length || 1) - 1)}
              >
                ←
              </button>
              <img 
                src={product.images?.[currentImageIndex] || product.thumbnail} 
                alt={product.title} 
                className="main-image" 
              />
              <button 
                className="image-nav-btn next" 
                onClick={() => setCurrentImageIndex(prev => prev < (product.images?.length || 1) - 1 ? prev + 1 : 0)}
              >
                →
              </button>
            </div>
            <div className="image-gallery">
              {product.images?.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt={`${product.title} ${i + 1}`}
                  className={currentImageIndex === i ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(i)}
                />
              ))}
            </div>
          </div>

          <div className="product-info-detail">
            <h1>{product.title}</h1>
            <div className="product-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-text">{product.rating}</span>
            </div>
            <div className="product-price-detail">${product.price}</div>
            <p className="product-description-detail">{product.description}</p>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Brand:</span>
                <span className="meta-value">{product.brand}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span className="meta-value">{product.stock} available</span>
              </div>
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>

        <div className="reviews-section">
          <div className="reviews-header">
            <h2>Customer Reviews ({reviews.length})</h2>
            <button className="write-review-btn" onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {showReviewForm && (
            <form className="review-form" onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Rating</label>
                <select value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}>
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </div>
              <div className="form-group">
                <label>Your Review</label>
                <textarea 
                  value={newReview.comment} 
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your experience with this product..."
                  required
                  rows={4}
                />
              </div>
              <button type="submit" className="submit-review-btn">Submit Review</button>
            </form>
          )}

          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header-item">
                    <div className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="review-author">{review.userName}</p>
                  <p className="review-text">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h2>You May Also Like</h2>
            <div className="recommendations-grid">
              {recommendations.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="recommendation-card">
                  <img src={item.thumbnail} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p className="rec-price">${item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
