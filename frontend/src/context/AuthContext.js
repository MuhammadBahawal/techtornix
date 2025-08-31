import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check admin authentication
      const adminAuth = localStorage.getItem('adminAuth');
      const adminData = localStorage.getItem('adminData');
      const adminToken = localStorage.getItem('adminToken');

      if (adminAuth === 'true' && adminData && adminToken) {
        try {
          // Verify admin token with backend
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setAdmin(JSON.parse(adminData));
              setIsAdmin(true);
            } else {
              // Invalid token, clear admin auth
              clearAdminAuth();
            }
          } else {
            // Token expired or invalid
            clearAdminAuth();
          }
        } catch (error) {
          console.error('Admin auth verification failed:', error);
          clearAdminAuth();
        }
      }

      // Check regular user authentication
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearAdminAuth = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminToken');
    setAdmin(null);
    setIsAdmin(false);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token || 'user-token');
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminToken', data.token || 'admin-token-' + Date.now());
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        setAdmin(data.admin);
        setIsAdmin(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, message: 'Network error' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const adminLogout = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAdminAuth();
    }
  };

  const value = {
    user,
    admin,
    login,
    adminLogin,
    register,
    logout,
    adminLogout,
    loading,
    isAuthenticated,
    isAdmin,
    isAdminAuthenticated: isAdmin && !!admin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
