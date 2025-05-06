import React, { useState, useEffect } from 'react';
import { User, Calendar, MessageSquare, LogOut, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BASE from '@/url/baseurl';

function UserPage() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    appointments: 2,
    recentActivities: [
      { icon: Calendar, title: 'Appointment with Dr. Smith', time: 'Tomorrow at 10:00 AM' },
      { icon: MessageSquare, title: 'New message from Dr. Johnson', time: '2 hours ago' }
    ]
  });

  //  data fetch 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response=await axios.get(`${BASE}/get/user`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              "Content-Type":'application/json'
            }
          }
        )

        if(response.data===null) return
        const user=response.data;
        
        setUserData({
          name:user.username ,
          appointments: user.appointments.length,
          recentActivities: [
            { icon: Calendar, title: 'Appointment with Dr. Smith', time: 'Tomorrow at 10:00 AM' },
            { icon: MessageSquare, title: 'New message from Dr. Johnson', time: '2 hours ago' }
          ]
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const menuItems = [
    { icon: Calendar, label: 'Appointments', path: '/user/appointment' },
    { icon: MessageSquare, label: 'AI assistance', path: '/user/ai' },
    { icon: MapPin, label: 'Nearby Hospitals', path: '/user/nearby' },
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '5rem' }
  };

  const contentVariants = {
    expanded: { marginLeft: '16rem' },
    collapsed: { marginLeft: '5rem' }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <motion.div 
          initial="expanded"
          animate={isSidebarCollapsed ? "collapsed" : "expanded"}
          variants={sidebarVariants}
          className="bg-gradient-to-b from-primary/5 to-background border-r-2 border-primary/20 h-screen fixed left-0 top-0 pt-20 overflow-hidden"
        >
          <div className="p-4">
            {/* Toggle Button */}
            <motion.button
              onClick={toggleSidebar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -right-3 top-24 bg-background border-2 border-primary/20 rounded-full p-1 hover:bg-primary/5 transition-colors z-10"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-foreground" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-foreground" />
              )}
            </motion.button>

            <motion.div 
              className="flex items-center gap-3 mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20"
              whileHover={{ scale: 1.02 }}
            >
              <User className="w-5 h-5 text-primary" />
              <AnimatePresence>
                {!isSidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-[120px]"
                  >
                    <h3 className="font-medium text-foreground">{userData.name}</h3>
                    <p className="text-sm text-muted-foreground">{userData.role}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => navigate(item.path)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors border border-primary/10 ${
                    isSidebarCollapsed ? 'justify-center' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <AnimatePresence>
                    {!isSidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </nav>
            
            {/* logout button */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors mt-8 border border-primary/10 ${
                isSidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut className="w-5 h-5" />
              <AnimatePresence>
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial="expanded"
          animate={isSidebarCollapsed ? "collapsed" : "expanded"}
          variants={contentVariants}
          className="flex-1 p-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-foreground mb-8"
            >
              Welcome, {userData.name}
            </motion.h1>
            
            {/* Welcome Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card p-6 rounded-xl border-2 border-primary/20 mb-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-foreground mb-2">Welcome back, {userData.name}!</h2>
              <p className="text-muted-foreground">
                Here's an overview of your health journey. You have {userData.appointments} upcoming appointments and {userData.messages} unread messages.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Upcoming Appointments', value: userData.appointments, color: 'text-primary' },
                { title: 'Unread Messages', value: userData.messages, color: 'text-primary' },
                { title: 'Health Score', value: userData.healthScore, color: 'text-primary' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-lg font-medium text-foreground mb-2">{stat.title}</h3>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {userData.recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20"
                  >
                    <activity.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserPage;