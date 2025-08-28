// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_LOGOUT: `${API_BASE_URL}/api/admin/logout`,
  ADMIN_VERIFY: `${API_BASE_URL}/api/admin/verify`,
  
  // Admin endpoints
  ADMIN_DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
  ADMIN_ANALYTICS: `${API_BASE_URL}/api/admin/analytics`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  
  // Blog endpoints
  BLOG_LIST: `${API_BASE_URL}/api/blog`,
  BLOG_CREATE: `${API_BASE_URL}/api/blog`,
  BLOG_UPDATE: (id) => `${API_BASE_URL}/api/blog/${id}`,
  BLOG_DELETE: (id) => `${API_BASE_URL}/api/blog/${id}`,
  
  // Contact endpoints
  CONTACT_SUBMIT: `${API_BASE_URL}/api/contact`,
  CONTACT_LIST: `${API_BASE_URL}/api/contact`,
  
  // Portfolio endpoints
  PORTFOLIO_LIST: `${API_BASE_URL}/api/portfolio`,
  PORTFOLIO_CREATE: `${API_BASE_URL}/api/portfolio`,
  PORTFOLIO_UPDATE: (id) => `${API_BASE_URL}/api/portfolio/${id}`,
  PORTFOLIO_DELETE: (id) => `${API_BASE_URL}/api/portfolio/${id}`,
  
  // Career endpoints
  CAREER_LIST: `${API_BASE_URL}/api/careers`,
  CAREER_CREATE: `${API_BASE_URL}/api/careers`,
  CAREER_UPDATE: (id) => `${API_BASE_URL}/api/careers/${id}`,
  CAREER_DELETE: (id) => `${API_BASE_URL}/api/careers/${id}`,
  
  // Services endpoints
  SERVICES_LIST: `${API_BASE_URL}/api/services`,
  SERVICES_CREATE: `${API_BASE_URL}/api/services`,
  SERVICES_UPDATE: (id) => `${API_BASE_URL}/api/services/${id}`,
  SERVICES_DELETE: (id) => `${API_BASE_URL}/api/services/${id}`,
};

// Helper function to make API calls with proper error handling
export const apiCall = async (url, options = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default API_BASE_URL;
