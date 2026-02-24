import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const UserRegister = () => {
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <header className="auth-header">
            <div className="auth-switch" role="tablist" aria-label="Account type">
              <Link className="auth-switch-link is-active" to="/user/register">User</Link>
              <Link className="auth-switch-link" to="/food-partner/register">Food partner</Link>
            </div>
            <p className="auth-eyebrow">Zomato</p>
            <h1>Create your account</h1>
            <p className="auth-subtitle">Order from your favorite restaurants in minutes.</p>
          </header>

          <form className="auth-form">
            <div className="field-group">
              <label htmlFor="user-name">Full name</label>
              <input id="user-name" type="text" placeholder="Ava Johnson" />
            </div>
            <div className="field-group">
              <label htmlFor="user-email">Email address</label>
              <input id="user-email" type="email" placeholder="ava@email.com" />
            </div>
            <div className="field-group">
              <label htmlFor="user-phone">Phone number</label>
              <input id="user-phone" type="tel" placeholder="+91 90000 00000" />
            </div>
            <div className="field-group">
              <label htmlFor="user-password">Password</label>
              <input id="user-password" type="password" placeholder="Create a strong password" />
            </div>

            <button className="primary-btn" type="button">Create account</button>
            <p className="auth-meta">
              Already have an account? <span className="auth-link">Sign in</span>
            </p>
          </form>
        </div>

        <aside className="auth-panel">
          <div className="panel-content">
            <h2>Fresh picks, fast delivery.</h2>
            <p>Track every order, save favorites, and get personalized deals.</p>
            <div className="panel-tags">
              <span>Live tracking</span>
              <span>Secure checkout</span>
              <span>24/7 support</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default UserRegister
