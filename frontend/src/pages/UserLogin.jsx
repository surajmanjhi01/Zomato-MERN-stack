import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import api from '../services/api'

const UserLogin = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements['login-email'].value;
    const password = e.target.elements['login-password'].value;

    try {
      const response = await api.post('/api/auth/user/login', {
        email,
        password
      });
      alert(response.data.message);
      e.target.reset();
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  }
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <header className="auth-header">
            <div className="auth-switch" role="tablist" aria-label="Account type">
              <Link className="auth-switch-link is-active" to="/user/login">User</Link>
              <Link className="auth-switch-link" to="/food-partner/login">Food partner</Link>
            </div>
            <p className="auth-eyebrow">Zomato</p>
            <h1>Welcome back</h1>
            <p className="auth-subtitle">Sign in to reorder your favorites.</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="login-email">Email address</label>
              <input id="login-email" type="email" placeholder="ava@email.com" />
            </div>
            <div className="field-group">
              <label htmlFor="login-password">Password</label>
              <input id="login-password" type="password" placeholder="Enter your password" />
            </div>
            <div className="form-row">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <span className="auth-link">Forgot password?</span>
            </div>

            <button className="primary-btn" type="submit">Sign in</button>
            <p className="auth-meta">
              New to Zomato? <Link className="auth-link" to="/user/register">Create an account</Link>
            </p>
          </form>
        </div>

        <aside className="auth-panel">
          <div className="panel-content">
            <h2>Cravings in one tap.</h2>
            <p>Save addresses, set dietary prefs, and reorder instantly.</p>
            <div className="panel-tags">
              <span>Instant reorder</span>
              <span>Saved cards</span>
              <span>Personalized offers</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default UserLogin
