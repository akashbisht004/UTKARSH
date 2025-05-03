import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Trash2, Calendar as CalendarIcon, ChevronRight, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import BASE from '@/url/baseurl';

// Appointment Card Component
const AppointmentCard = ({ appointment, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/5 to-background rounded-xl border border-primary/20 shadow-md overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {appointment.hospital.tags.name}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(appointment.appointment.id)}
            className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-foreground">{appointment.hospital.tags["addr:full"]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-foreground">
              {new Date(appointment.appointment.timestamp).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.open(`https://www.google.com/maps?q=${appointment.hospital.lat},${appointment.hospital.lon}`, '_blank');
            }}
            className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Calendar Component
const AppointmentCalendar = ({ appointments, selectedDate, onDateChange }) => {
  const hasAppointmentOnDate = (date) => {
    if (!Array.isArray(appointments)) return false;
    return appointments.some(apt => 
      new Date(apt.appointment.timestamp).toDateString() === date.toDateString()
    );
  };

  const tileContent = ({ date }) => {
    return hasAppointmentOnDate(date) ? (
      <div className="w-2 h-2 rounded-full bg-primary mx-auto mt-1" />
    ) : null;
  };

  const tileClassName = ({ date }) => {
    return hasAppointmentOnDate(date) ? 'bg-primary/10' : '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-1"
    >
      <div className="bg-gradient-to-br from-primary/5 to-background rounded-xl border border-primary/20 shadow-md p-6 h-full">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Calendar</h2>
        </div>
        <div className="calendar-wrapper">
          <Calendar
            onChange={onDateChange}
            value={selectedDate}
            className="border-0"
            tileContent={tileContent}
            tileClassName={tileClassName}
            formatShortWeekday={(locale, date) => 
              ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
            }
            formatMonthYear={(locale, date) => 
              date.toLocaleString('default', { month: 'long', year: 'numeric' })
            }
            next2Label={null}
            prev2Label={null}
            minDetail="month"
            showNeighboringMonth={false}
            locale="en-US"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-primary/5 to-background rounded-xl border border-primary/20 shadow-md p-8 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
      <Clock className="w-10 h-10" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">
      No Appointments Scheduled
    </h3>
    <p className="text-muted-foreground mb-4">
      You don't have any upcoming appointments. Schedule one now!
    </p>
  </motion.div>
);

// Loading State Component
const LoadingState = () => (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
    <p className="text-muted-foreground mt-4">Loading appointments...</p>
  </div>
);

// Error State Component
const ErrorState = ({ error }) => (
  <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6 text-center">
    {error}
  </div>
);

// Page Header Component
const PageHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-8"
  >
    <h1 className="text-3xl font-bold text-foreground mb-2">
      My Appointments
    </h1>
    <p className="text-muted-foreground">
      View and manage your upcoming appointments
    </p>
  </motion.div>
);

function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE}/getAppointments`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Add random dates to appointments
      const appointmentsWithRandomDates = response.data.map(appointment => {
        // Generate a random date within the next 30 days
        const today = new Date();
        const randomDays = Math.floor(Math.random() * 30) + 1; // 1 to 30 days
        const randomHours = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
        const randomMinutes = Math.floor(Math.random() * 60); // 0 to 59 minutes
        
        const appointmentDate = new Date(today);
        appointmentDate.setDate(today.getDate() + randomDays);
        appointmentDate.setHours(randomHours, randomMinutes, 0, 0);

        return {
          ...appointment,
          appointment: {
            ...appointment.appointment,
            timestamp: appointmentDate.toISOString()
          }
        };
      });

      setAppointments(appointmentsWithRandomDates || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to load appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`${BASE}/appointment/delete/${appointmentId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error canceling appointment:', error);
      setError('Failed to cancel appointment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        
        {error && <ErrorState error={error} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {loading ? (
                <LoadingState />
              ) : Array.isArray(appointments) && appointments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {appointments.map((appointment, index) => (
                    <AppointmentCard
                      key={appointment.appointment.id}
                      appointment={appointment}
                      onDelete={handleDeleteAppointment}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </AnimatePresence>
          </div>

          {/* Calendar Section */}
          <AppointmentCalendar
            appointments={appointments}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default AppointmentPage;