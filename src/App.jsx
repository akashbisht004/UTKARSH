import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"

import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import AppointmentPage from "./pages/AppointmentPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import UserDashboard from "./pages/dashboard/UserDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

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
          <Route path="/appointment" element={<AppointmentPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="users" element={<div>Users Management</div>} />
              <Route path="appointments" element={<div>Appointments Management</div>} />
              <Route path="settings" element={<div>Admin Settings</div>} />
            </Route>
          </Route>

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="user" />}>
            <Route path="/user" element={<UserDashboard />}>
              <Route path="profile" element={<div>User Profile</div>} />
              <Route path="appointments" element={<div>My Appointments</div>} />
              <Route path="settings" element={<div>User Settings</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
