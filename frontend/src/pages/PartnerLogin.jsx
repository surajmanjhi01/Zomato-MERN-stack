import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import api from '../services/api'

const PartnerLogin = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements['partner-login-email'].value;
    const password = e.target.elements['partner-login-password'].value;

    try {
      const response = await api.post('/api/auth/foodpartner/login', {
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
              <Link className="auth-switch-link" to="/user/login">User</Link>
              <Link className="auth-switch-link is-active" to="/food-partner/login">Food partner</Link>
            </div>
            <p className="auth-eyebrow">Zomato Partner</p>
            <h1>Welcome back</h1>
            <p className="auth-subtitle">Access your dashboard and live orders.</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="partner-login-email">Business email</label>
              <input id="partner-login-email" type="email" placeholder="hello@urbanspice.com" />
            </div>
            <div className="field-group">
              <label htmlFor="partner-login-password">Password</label>
              <input id="partner-login-password" type="password" placeholder="Enter your password" />
            </div>
            <div className="form-row">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>
              <span className="auth-link">Reset password</span>
            </div>

            <button className="primary-btn" type="submit">Sign in</button>
            <p className="auth-meta">
              New partner? <Link className="auth-link" to="/food-partner/register">Register now</Link>
            </p>
          </form>
        </div>

        <aside className="auth-panel">
          <div className="panel-content">
            <h2>Operate with confidence.</h2>
            <p>Stay on top of prep times, payouts, and daily performance.</p>
            <div className="panel-tags">
              <span>Live orders</span>
              <span>Daily payouts</span>
              <span>Ops tips</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default PartnerLogin
