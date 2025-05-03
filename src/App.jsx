import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"

import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import AppointmentPage from "./pages/AppointmentPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Admin from "./pages/Admin"
import User from "./pages/User"
import Nearby from "./pages/Nearby" 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check authentication state on mount
    const authState = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(authState === 'true');
    setUserRole(role);
  }, []);

  return(
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/services" element={<ServicesPage/>}/>
          <Route path="/user/appointment" element={<AppointmentPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/admin" element={<Admin/>}/> 
          <Route path="/user" element={<User/>}/>
          <Route path="/user/nearby" element={<Nearby/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
