import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleAuth from "./GoogleAuth";
import "../css/Auth.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';





function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      onLogin(data.token, data.user);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
      <Link to="/" className="close-button">×</Link>
      <div className="auth-header">
        <div className="auth-logo">
          <svg className="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="auth-title">Shop<span className="logo-accent">Ease</span></h1>
        </div>
        <p className="auth-subtitle">Welcome back! Sign in to your account</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input password-input"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="form-options">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="checkmark"></span>
            Remember me
          </label>
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <GoogleAuth 
        onSuccess={onLogin}
        onError={(error) => setError(error)}
      />

      <div className="auth-switch">
        Don't have an account?{" "}
        <Link to="/signup" className="auth-link">
          Sign up
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Login;
