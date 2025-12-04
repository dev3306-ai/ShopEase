import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Account.css";

function Account({ token, onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [token, navigate]);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="account-page">
      <nav className="account-nav">
        <Link to="/" className="nav-logo">
          <span className="logo-text">
            Shop<span className="logo-accent">Ease</span>
          </span>
        </Link>
      </nav>

      <div className="account-container">
        <div className="account-header">
          <div className="account-avatar">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h1>My Account</h1>
          <p className="account-subtitle">Manage your account information</p>
        </div>

        <div className="account-content">
          <div className="account-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <p>{user.name}</p>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>Account ID</label>
                <p>#{user.id}</p>
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>{new Date(user.id).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="account-actions">
            <Link to="/products" className="action-btn secondary">
              Continue Shopping
            </Link>
            <button onClick={handleLogout} className="action-btn logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
