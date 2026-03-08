import React from 'react';
import { Link } from 'react-router-dom';
import './UserRegister.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const fullName = e.target.elements.fullName.value.trim();
        const email = e.target.elements.email.value.trim();
        const phoneNumber = e.target.elements.phoneNumber.value.trim();
        const password = e.target.elements.password.value;

        const payload = {
          fullName,
          email,
          phoneNumber,
          password,
        };

        console.log('Submitting payload:', payload);

        try {
          const response = await axios.post('http://localhost:4000/api/auth/user/register', payload, {
            withCredentials: true,
          });
          console.log('User registered successfully:', response.data);
            navigate('/user/login');
        } catch (error) {
          const backendMessage = error.response?.data?.message;
          const backendError = error.response?.data?.error;
          const status = error.response?.status;

          console.error('Registration failed:', {
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us to order delicious food</p>
        </div>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

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
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="form-input"
              placeholder="Enter your phone number"
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
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>

        <div className="auth-footer">
          <span className="auth-link-text">
            Already have an account?
            <Link to="/user/login" className="auth-link">
              Sign In
            </Link>
          </span>
        </div>

        <div className="auth-footer" style={{ paddingTop: '1rem', marginTop: '0.5rem', borderTop: 'none' }}>
          <span className="auth-link-text">
            Want to register as a restaurant partner?
            <Link to="/food-partner/register" className="auth-link">
              Partner Registration
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserRegister
