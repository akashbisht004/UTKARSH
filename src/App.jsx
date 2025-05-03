import { BrowserRouter,Routes,Route } from "react-router-dom"
import React from "react"

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
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/services" element={<ServicesPage/>}/>
          <Route path="/appointment" element={<AppointmentPage/>}/>
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
