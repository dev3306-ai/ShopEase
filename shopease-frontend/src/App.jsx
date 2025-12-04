import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Orders from './components/Orders'
import Reviews from './components/Reviews'
import Account from './components/Account'
import Wishlist from './components/Wishlist'

import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const handleLogin = (newToken, userData) => {
    localStorage.setItem('token', newToken)
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage token={token} onLogout={handleLogout} />} 
          />
          <Route 
            path="/dashboard" 
            element={token ? <Dashboard user={JSON.parse(localStorage.getItem('user') || '{}')} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/account" element={<Account token={token} onLogout={handleLogout} />} />
          <Route 
            path="/login" 
            element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!token ? <Signup onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App