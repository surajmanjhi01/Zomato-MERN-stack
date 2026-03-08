import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FoodPartnerLogin.css';
import axios from 'axios';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value;

    const payload = {
      email,
      password,
    };

    console.log('Submitting payload:', payload);

    try {
      const response = await axios.post('http://localhost:4000/api/auth/foodpartner/login', payload, {
        withCredentials: true,
      });
      console.log('Food partner logged in successfully:', response.data);
      navigate('/create-food');
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      const backendError = error.response?.data?.error;
      const status = error.response?.status;

      console.error('Login failed:', {
        status,
        message: backendMessage || error.message,
        error: backendError,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Partner Login</h1>
          <p className="auth-subtitle">Access your restaurant dashboard</p>
        </div>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <span className="auth-link-text">
            New partner?
            <Link to="/food-partner/register" className="auth-link">
              Register Now
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
