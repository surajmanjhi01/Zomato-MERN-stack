import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/user/register" element={<h1>User Register</h1>} />
              <Route path="/user/login" element={<h1>User Login</h1>} />
                  <Route path="/food-partner/register" element={<h1>Food Partner Register</h1>} />
                      <Route path="/food-partner/login" element={<h1>Food Partner Login</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default AppRoutes
