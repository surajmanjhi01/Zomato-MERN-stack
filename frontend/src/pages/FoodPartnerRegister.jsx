import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FoodPartnerRegister.css';
import axios from 'axios';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const email = e.target.elements.email.value.trim();
    const RestaurantName = e.target.elements.RestaurantName.value.trim();
    const ContactNumber = e.target.elements.ContactNumber.value.trim();
    const password = e.target.elements.password.value;

    const payload = {
      name,
      email,
      RestaurantName,
      ContactNumber,
      password,
    };

    console.log('Submitting payload:', payload);

    try {
      const response = await axios.post('http://localhost:4000/api/auth/foodpartner/register', payload, {
        withCredentials: true,
      });
      console.log('Food partner registered successfully:', response.data);
      navigate('/food-partner/login');
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
          <h1 className="auth-title">Partner With Us</h1>
          <p className="auth-subtitle">Register your restaurant and start serving</p>
        </div>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your name"
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
            <label htmlFor="restaurantName" className="form-label">
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurantName"
              name="RestaurantName"
              className="form-input"
              placeholder="Enter restaurant name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="ContactNumber"
              className="form-input"
              placeholder="Enter contact number"
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
            Register as Partner
          </button>
        </form>

        <div className="auth-footer">
          <span className="auth-link-text">
            Already a partner?
            <Link to="/food-partner/login" className="auth-link">
              Sign In
            </Link>
          </span>
        </div>

        <div className="auth-footer" style={{ paddingTop: '1rem', marginTop: '0.5rem', borderTop: 'none' }}>
          <span className="auth-link-text">
            Want to register as a customer?
            <Link to="/user/register" className="auth-link">
              Customer Registration
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
