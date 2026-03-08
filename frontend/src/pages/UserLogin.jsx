import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserLogin.css';
import axios from 'axios';

const UserLogin = () => {
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
      const response = await axios.post('http://localhost:4000/api/auth/user/login', payload, {
        withCredentials: true,
      });
      console.log('User logged in successfully:', response.data);
      navigate('/home');
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
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue ordering</p>
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
            Don't have an account?
            <Link to="/user/register" className="auth-link">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
