import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react"
import { ThemeProvider } from "./lib/theme-context"

import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import AppointmentPage from "./pages/AppointmentPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Admin from "./pages/Admin"
import User from "./pages/User"
import Nearby from "./pages/Nearby" 
import VisitorTracker from './components/VisitorTracker';
import AIAssistant from './pages/AIAssistant';
import VirtualConsultation from './pages/VirtualConsultation';
import WellnessPage from './pages/WellnessPage';
import ReportAnalysis from './pages/ReportAnalysis';
import AllUsers from './pages/AllUsers';
import AllAppointments from './pages/AllAppointments';
import Doctor from './pages/Doctor';
function App() {
  return (
    <ThemeProvider>
      <Router>
        <VisitorTracker />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/services" element={<ServicesPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/admin/users" element={<AllUsers/>}/>
          <Route path="/admin/appointments" element={<AllAppointments/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/user/nearby" element={<Nearby/>}/>
          <Route path="/user/appointment" element={<AppointmentPage/>}/>
          <Route path="/user/ai" element={<AIAssistant/>}/>
          <Route path="/user/virtual-consultation" element={<VirtualConsultation/>}/>
          <Route path="/wellness" element={<WellnessPage/>}/>
          <Route path="/user/report-analysis" element={<ReportAnalysis/>}/>
          <Route path="/doctor" element={<Doctor/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
