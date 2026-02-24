import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const PartnerRegister = () => {
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <header className="auth-header">
            <div className="auth-switch" role="tablist" aria-label="Account type">
              <Link className="auth-switch-link" to="/user/register">User</Link>
              <Link className="auth-switch-link is-active" to="/food-partner/register">Food partner</Link>
            </div>
            <p className="auth-eyebrow">Zomato Partner</p>
            <h1>Register your kitchen</h1>
            <p className="auth-subtitle">Start reaching more customers today.</p>
          </header>

          <form className="auth-form">
            <div className="field-group">
              <label htmlFor="partner-name">Restaurant name</label>
              <input id="partner-name" type="text" placeholder="Urban Spice" />
            </div>
            <div className="field-group">
              <label htmlFor="partner-owner">Owner name</label>
              <input id="partner-owner" type="text" placeholder="Arjun Mehta" />
            </div>
            <div className="field-group">
              <label htmlFor="partner-email">Business email</label>
              <input id="partner-email" type="email" placeholder="hello@urbanspice.com" />
            </div>
            <div className="field-group">
              <label htmlFor="partner-phone">Contact number</label>
              <input id="partner-phone" type="tel" placeholder="+91 90000 00000" />
            </div>

            <button className="primary-btn" type="button">Create partner account</button>
            <p className="auth-meta">
              Already listed? <span className="auth-link">Sign in</span>
            </p>
          </form>
        </div>

        <aside className="auth-panel">
          <div className="panel-content">
            <h2>Grow with real-time insights.</h2>
            <p>Manage menus, track orders, and plan your prep smoothly.</p>
            <div className="panel-tags">
              <span>Smart analytics</span>
              <span>Menu control</span>
              <span>Priority support</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default PartnerRegister
