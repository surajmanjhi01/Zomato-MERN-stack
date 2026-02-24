import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const UserLogin = () => {
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

          <form className="auth-form">
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

            <button className="primary-btn" type="button">Sign in</button>
            <p className="auth-meta">
              New to Zomato? <span className="auth-link">Create an account</span>
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
