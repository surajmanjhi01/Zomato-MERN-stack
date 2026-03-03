import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.elements['user-name'].value;
    const email = e.target.elements['user-email'].value;
    const phoneNumber = e.target.elements['user-phone'].value;
    const password = e.target.elements['user-password'].value;

    try {
      const response = await api.post('/api/auth/user/register', {
        fullName,
        email,
        phoneNumber,
        password
      });
      alert(response.data.message);
      e.target.reset();
      navigate('/user/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  }
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

          <form className="auth-form" onSubmit={handleSubmit}>
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

            <button className="primary-btn" type="submit">Create account</button>
            <p className="auth-meta">
              Already have an account? <Link className="auth-link" to="/user/login">Sign in</Link>
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
