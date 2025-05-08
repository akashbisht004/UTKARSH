import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trash2, Loader2 } from 'lucide-react';
import axios from 'axios';
import { BASE } from '@/url/baseurl';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data!==null) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setDeletingUserId(userId);
      await axios.delete(`${BASE}/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Remove the deleted user from the state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again later.');
    } finally {
      setDeletingUserId(null);
    }
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
        <h1 className="text-3xl font-bold text-foreground">All Users</h1>
        <p className="text-muted-foreground mt-2">Manage your platform users</p>
      </motion.div>

      <div className="grid gap-6">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">{user.username}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteUser(user.id)}
                disabled={deletingUserId === user.id}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                {deletingUserId === user.id ? (
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

export default AllUsers; 