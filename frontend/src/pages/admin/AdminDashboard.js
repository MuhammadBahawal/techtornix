import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import RealTimeAnalytics from '../../components/admin/RealTimeAnalytics';
import JobManagement from './JobManagement';
import ApplicationManagement from './ApplicationManagement';
import BlogManagement from './BlogManagement';
import PortfolioManagement from './PortfolioManagement';
import ServicesManagement from './ServicesManagement';
import TeamManagement from './TeamManagement';
import ClientManagement from './ClientManagement';
import ContactManagement from './ContactManagement';
import GeneralSettings from './GeneralSettings';
import { 
  FiHome,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiMail,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBarChart2,
  FiEye,
  FiMessageSquare,
  FiEdit3,
  FiTrash2,
  FiDownload,
  FiActivity
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { admin, adminLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const sidebarItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/jobs', icon: FiUsers, label: 'Job Management' },
    { path: '/admin/applications', icon: FiFileText, label: 'Applications' },
    { path: '/admin/blog', icon: FiFileText, label: 'Blog Posts' },
    { path: '/admin/portfolio', icon: FiBriefcase, label: 'Portfolio' },
    { path: '/admin/services', icon: FiSettings, label: 'Services' },
    { path: '/admin/contacts', icon: FiMail, label: 'Contact Messages' },
    { path: '/admin/team', icon: FiUsers, label: 'Team' },
    { path: '/admin/clients', icon: FiBriefcase, label: 'Clients' },
    { path: '/admin/settings', icon: FiSettings, label: 'Settings' }
  ];

  const stats = [
    { label: 'Total Views', value: '124,532', change: '+12%', icon: FiEye, color: 'text-blue-600' },
    { label: 'Blog Posts', value: '48', change: '+3', icon: FiFileText, color: 'text-green-600' },
    { label: 'Projects', value: '23', change: '+2', icon: FiBriefcase, color: 'text-purple-600' },
    { label: 'Messages', value: '156', change: '+24', icon: FiMessageSquare, color: 'text-orange-600' }
  ];

  const recentActivities = [
    { id: 1, type: 'blog', title: 'New blog post published', time: '2 hours ago' },
    { id: 2, type: 'contact', title: 'New contact message received', time: '4 hours ago' },
    { id: 3, type: 'portfolio', title: 'Portfolio project updated', time: '1 day ago' },
    { id: 4, type: 'career', title: 'New job application', time: '2 days ago' }
  ];

  const DashboardHomeContent = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Real-Time Analytics and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealTimeAnalytics />

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiActivity className="w-5 h-5 mr-2 text-cyan-500" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiMail className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">New contact message</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiUsers className="w-5 h-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">New job application</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <FiFileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">New Post</p>
              </button>
              <button className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <FiBriefcase className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                <p className="text-xs font-medium text-green-600 dark:text-green-400">Add Project</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BlogManagement = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h2>
        <button className="btn-primary">
          <FiFileText className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>
      <div className="text-center py-12">
        <FiFileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Blog management interface would go here</p>
      </div>
    </div>
  );

  const PortfolioManagement = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Management</h2>
        <button className="btn-primary">
          <FiBriefcase className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>
      <div className="text-center py-12">
        <FiBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Portfolio management interface would go here</p>
      </div>
    </div>
  );

  const CareersManagement = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Careers Management</h2>
        <button className="btn-primary">
          <FiUsers className="w-5 h-5 mr-2" />
          New Job Posting
        </button>
      </div>
      <div className="text-center py-12">
        <FiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Careers management interface would go here</p>
      </div>
    </div>
  );

  const ContactsManagement = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Messages</h2>
      <div className="text-center py-12">
        <FiMail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Contact messages interface would go here</p>
      </div>
    </div>
  );

  const Settings = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      <div className="text-center py-12">
        <FiSettings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Settings interface would go here</p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Techtornix</title>
        <meta name="description" content="Techtornix admin dashboard for managing content and settings" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold gradient-text">Techtornix Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Top Bar */}
          <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<DashboardHomeContent />} />
                <Route path="/jobs" element={<JobManagement />} />
                <Route path="/applications" element={<ApplicationManagement />} />
                <Route path="/blog" element={<BlogManagement />} />
                <Route path="/portfolio" element={<PortfolioManagement />} />
                <Route path="/services" element={<ServicesManagement />} />
                <Route path="/contacts" element={<ContactManagement />} />
                <Route path="/team" element={<TeamManagement />} />
                <Route path="/clients" element={<ClientManagement />} />
                <Route path="/settings" element={<GeneralSettings />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

const DashboardHome = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('http://techtornix.vercel.app/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data.stats || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RealTimeAnalytics />

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiActivity className="w-5 h-5 mr-2 text-cyan-500" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <FiMail className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">New contact message</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <FiUsers className="w-5 h-5 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">New job application</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <FiFileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">New Post</p>
            </button>
            <button className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <FiBriefcase className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
              <p className="text-xs font-medium text-green-600 dark:text-green-400">Add Project</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
