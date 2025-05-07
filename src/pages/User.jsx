import React, { useState, useEffect } from 'react';
import { User, Calendar, MessageSquare, LogOut, ChevronLeft, ChevronRight, MapPin, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {BASE} from '@/url/baseurl';

function UserPage() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({
    username: '',
    appointments: 0,
    recentActivities: []
  });

  //  data fetch 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response1=await axios.get(`${BASE}/get/user`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              "Content-Type":'application/json'
            }
          }
        )
        const response2=await axios.get(`${BASE}/getAppointments`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type":'application/json'
          }
        })

        if(response1.data!==null && response2.data!==null){
          let user=response1.data;
          let appointments=response2.data;
          setUserData({
            username:user.username ,
            appointments: (user.appointments!==null)?user.appointments.length:0,
            recentActivities:appointments.map(appointment=>({
              icon:Calendar,
              title:appointment.hospital.tags.name,
              time:appointment.appointment.timestamp
            }))
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    }

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
                    <h3 className="font-medium text-foreground">{userData.username}</h3>
                    <p className="text-sm text-muted-foreground">User</p>
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">Loading user data...</p>
              </div>
            ) : (
              <>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-foreground mb-8"
                >
                  Welcome, {userData.username}
                </motion.h1>
                
                {/* Welcome Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card p-6 rounded-xl border-2 border-primary/20 mb-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <p className="text-muted-foreground">
                    Here's an overview of your health journey. You have {userData.appointments} upcoming appointments.
                  </p>
                </motion.div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { title: 'Upcoming Appointments', value: userData.appointments, color: 'text-primary' },  
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
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserPage;