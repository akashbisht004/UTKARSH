import { BrowserRouter,Routes,Route } from "react-router-dom"
import React from "react"

import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import AppointmentPage from "./pages/AppointmentPage"

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/services" element={<ServicesPage/>}/>
          <Route path="/appointment" element={<AppointmentPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
