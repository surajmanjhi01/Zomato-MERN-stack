import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import Home from "../pages/general/Home";
import Createfood from '../pages/food-partner/Createfood';
import Profile from '../pages/food-partner/profile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRegister />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-food" element={<Createfood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
