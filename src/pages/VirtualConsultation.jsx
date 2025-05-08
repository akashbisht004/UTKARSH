import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Clock, Star, MapPin, Phone, Mail, ExternalLink, Loader2 } from 'lucide-react';
import axios from 'axios';
import { BASE } from '@/url/baseurl';

const specializations = [
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Gynecology',
  'Ophthalmology',
  'ENT'
];

const generateDoctors = (specialization) => {
  const names = [
    'Dr. Rajesh Kumar',
    'Dr. Priya Sharma',
    'Dr. Amit Patel',
    'Dr. Neha Gupta'
  ];
  
  return names.map(name => ({
    id: Math.random().toString(36).substr(2, 9),
    name,
    specialization,
    rating: (4 + Math.random()).toFixed(1),
    experience: Math.floor(Math.random() * 20) + 5,
    availability: ['Mon', 'Wed', 'Fri'],
    zoomLink: `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    consultationFee: 1000
  }));
};

function VirtualConsultation() {

  
  const [selectedSpecialization, setSelectedSpecialization] = useState(specializations[0]);
  const [doctors] = useState(() => 
    specializations.reduce((acc, spec) => ({
      ...acc,
      [spec]: generateDoctors(spec)
    }), {})
  );
  const [loadingDoctorId, setLoadingDoctorId] = useState(null);

  const handleBookConsultation = async (doctor) => {
    setLoadingDoctorId(doctor.id);
    try {
      const zoomLink = `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      let formData = new FormData();
      
      console.log(formData);
      const response = await axios.post(`${BASE}/create-consultation`, {
        doctorName: doctor.name,
        zoomLink: zoomLink
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      window.open(zoomLink, '_blank');
    } catch (error) {
      console.error('Error creating consultation:', error);
      alert('Failed to create consultation. Please try again.');
    } finally {
      setLoadingDoctorId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Virtual Consultation
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with expert doctors from the comfort of your home
          </p>
        </motion.div>

        {/* Specialization Filter */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {specializations.map((spec) => (
            <motion.button
              key={spec}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSpecialization(spec)}
              className={`px-6 py-2 rounded-full border-2 transition-colors ${
                selectedSpecialization === spec
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-primary/20 text-foreground hover:bg-primary/5'
              }`}
            >
              {spec}
            </motion.button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors[selectedSpecialization].map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card rounded-xl border-2 border-primary/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
                <p className="text-muted-foreground">{doctor.specialization}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.experience} years exp.)
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{doctor.availability.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>30 min consultation</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-primary">
                  ₹1000
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookConsultation(doctor)}
                  disabled={loadingDoctorId === doctor.id}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingDoctorId === doctor.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4" />
                      <span>Book Now</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualConsultation;
