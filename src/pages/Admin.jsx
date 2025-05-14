import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getVisitorStats } from '../utils/visitorTracking';
import VisitorTracker from '../components/VisitorTracker';
import axios from 'axios';
import { BASE } from '@/url/baseurl';

const Admin = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [adminData, setAdminData] = useState({
    name: 'Admin User',
    role: 'Administrator',
    totalUsers: 0,
    activeAppointments: 0,
    visitorData: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Website Visitors',
          data: [0, 0, 0, 0, 0, 0, 0],
          borderColor: 'rgb(99, 102, 241)',
          tension: 0.4
        }
      ]
    },
    visitorStats: {
      growth: '0.0',
      total: 0
    }
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch users count
        const usersResponse = await axios.get(`${BASE}/getAllUsers`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        // Fetch appointments count
        const appointmentsResponse = await axios.get(`${BASE}/getAllAppointments`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        setAdminData(prev => ({
          ...prev,
          totalUsers: usersResponse.data.length || 0,
          activeAppointments: appointmentsResponse.data.length || 0
        }));
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const updateVisitorData = () => {
      const stats = getVisitorStats();
      setAdminData(prev => ({
        ...prev,
        visitorData: {
          ...prev.visitorData,
          datasets: [{
            ...prev.visitorData.datasets[0],
            data: stats.weekly
          }]
        },
        visitorStats: {
          growth: stats.growth,
          total: stats.total
        }
      }));
    };

    updateVisitorData();

    // Set up interval for updates
    const interval = setInterval(updateVisitorData, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { icon: Users, label: 'Users Management', path: '/admin/users' },
    { icon: Calendar, label: 'Appointments', path: '/admin/appointments' },
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
                <Users className="w-5 h-5 text-primary" />
                <AnimatePresence>
                  {!isSidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="min-w-[120px]"
                    >
                      <h3 className="font-medium text-foreground">{adminData.name}</h3>
                      <p className="text-sm text-muted-foreground">{adminData.role}</p>
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
                Welcome, {adminData.name}
              </motion.h1>
              
              {/* Welcome Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card p-6 rounded-xl border-2 border-primary/20 mb-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">Admin Dashboard</h2>
                <p className="text-muted-foreground">
                  Manage your healthcare platform efficiently. You have  {adminData.activeAppointments} active appointments.
                </p>
              </motion.div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { title: 'Total Users', value: adminData.totalUsers, color: 'text-primary' },
                  { title: 'Active Appointments', value: adminData.activeAppointments, color: 'text-primary' },
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

              {/* Website Visitors Graph */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Website Visitors</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Total Visitors: {adminData.visitorStats.total}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {parseFloat(adminData.visitorStats.growth) >= 0 ? '+' : ''}
                      {adminData.visitorStats.growth}% from last week
                    </span>
                  </div>
                </div>
                
                <div className="h-[300px] relative">
                  {/* Graph Container */}
                  <div className="absolute inset-0 flex items-end justify-between px-4">
                    {adminData.visitorData.datasets[0].data.map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div 
                          className="w-12 bg-primary/20 rounded-t-lg transition-all duration-300 hover:bg-primary/30"
                          style={{ height: `${(value / Math.max(...adminData.visitorData.datasets[0].data, 1)) * 250}px` }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {adminData.visitorData.labels[index]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4 text-sm text-muted-foreground">
                    <span>{Math.max(...adminData.visitorData.datasets[0].data)}</span>
                    <span>{Math.round(Math.max(...adminData.visitorData.datasets[0].data) * 0.75)}</span>
                    <span>{Math.round(Math.max(...adminData.visitorData.datasets[0].data) * 0.5)}</span>
                    <span>{Math.round(Math.max(...adminData.visitorData.datasets[0].data) * 0.25)}</span>
                    <span>0</span>
                  </div>
                </div>

                {/* Graph Legend */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                    <span className="text-sm text-muted-foreground">This Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/10" />
                    <span className="text-sm text-muted-foreground">Last Week</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <VisitorTracker />
      </div>
  );
};

export default Admin; 