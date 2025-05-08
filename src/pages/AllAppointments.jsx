import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trash2, Loader2, Clock, MapPin, User, Stethoscope } from 'lucide-react';
import axios from 'axios';
import { BASE } from '@/url/baseurl';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE}/admin/appointments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to load appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      setDeletingAppointmentId(appointmentId);
      await axios.delete(`${BASE}/admin/appointments/${appointmentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Remove the deleted appointment from the state
      setAppointments(prevAppointments => 
        prevAppointments.filter(appointment => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to cancel appointment. Please try again later.');
    } finally {
      setDeletingAppointmentId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">All Appointments</h1>
        <p className="text-muted-foreground mt-2">Manage platform appointments</p>
      </motion.div>

      <div className="grid gap-6">
        {appointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {appointment.hospital?.name || 'Hospital Name'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(appointment.appointment.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{appointment.hospital?.address || 'Hospital Address'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteAppointment(appointment.id)}
                disabled={deletingAppointmentId === appointment.id}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                {deletingAppointmentId === appointment.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments; 