import React from 'react'
import Header from '../components/layout/Header'

function AboutPage() {
  return (
    <>
      <Header/>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Welcome to our Healthcare Platform</h2>
          <p className="text-gray-700 mb-8">
            Our comprehensive healthcare solution provides easy access to medical services, appointment booking, 
            and health record management. Sign in to access personalized healthcare services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Appointments</h3>
              <p className="text-gray-600">Schedule appointments with doctors and specialists with ease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Medical Records</h3>
              <p className="text-gray-600">Access your complete medical history and test results anytime.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Prescriptions</h3>
              <p className="text-gray-600">Manage and renew your prescriptions with a few simple clicks.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage