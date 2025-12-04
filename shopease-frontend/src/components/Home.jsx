import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-container">
      <div className="auth-header">
        <h1 className="home-title">ShopEase</h1>
        <p className="home-subtitle">Your Modern E-Commerce Solution</p>
      </div>

      <div className="home-buttons">
        <Link to="/login" className="home-button primary">
          Sign In
        </Link>
        <Link to="/signup" className="home-button secondary">
          Create Account
        </Link>
      </div>
    </div>
  )
}

export default Home