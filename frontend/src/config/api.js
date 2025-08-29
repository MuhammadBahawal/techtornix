// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://techtornix-backend.vercel.app';

export const API_ENDPOINTS = {
  // Auth endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_LOGOUT: `${API_BASE_URL}/api/admin/logout`,
  ADMIN_VERIFY: `${API_BASE_URL}/api/admin/verify-token`,
  
  // Admin endpoints
  ADMIN_DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
  ADMIN_ANALYTICS: `${API_BASE_URL}/api/admin/analytics`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  
  // Admin Blog Management
  ADMIN_BLOGS: `${API_BASE_URL}/api/admin/blogs`,
  ADMIN_BLOG_CREATE: `${API_BASE_URL}/api/admin/blogs`,
  ADMIN_BLOG_UPDATE: (id) => `${API_BASE_URL}/api/admin/blogs/${id}`,
  ADMIN_BLOG_DELETE: (id) => `${API_BASE_URL}/api/admin/blogs/${id}`,
  
  // Admin Portfolio Management
  ADMIN_PORTFOLIO: `${API_BASE_URL}/api/admin/portfolio`,
  ADMIN_PORTFOLIO_CREATE: `${API_BASE_URL}/api/admin/portfolio`,
  ADMIN_PORTFOLIO_UPDATE: (id) => `${API_BASE_URL}/api/admin/portfolio/${id}`,
  ADMIN_PORTFOLIO_DELETE: (id) => `${API_BASE_URL}/api/admin/portfolio/${id}`,
  
  // Admin Services Management
  ADMIN_SERVICES: `${API_BASE_URL}/api/admin/services`,
  ADMIN_SERVICE_CREATE: `${API_BASE_URL}/api/admin/services`,
  ADMIN_SERVICE_UPDATE: (id) => `${API_BASE_URL}/api/admin/services/${id}`,
  ADMIN_SERVICE_DELETE: (id) => `${API_BASE_URL}/api/admin/services/${id}`,
  
  // Admin Careers Management
  ADMIN_CAREERS: `${API_BASE_URL}/api/admin/careers`,
  ADMIN_CAREER_CREATE: `${API_BASE_URL}/api/admin/careers`,
  ADMIN_CAREER_UPDATE: (id) => `${API_BASE_URL}/api/admin/careers/${id}`,
  ADMIN_CAREER_DELETE: (id) => `${API_BASE_URL}/api/admin/careers/${id}`,
  
  // Admin Contact Management
  ADMIN_CONTACTS: `${API_BASE_URL}/api/admin/contacts`,
  ADMIN_CONTACT_READ: (id) => `${API_BASE_URL}/api/admin/contacts/${id}/read`,
  ADMIN_CONTACT_DELETE: (id) => `${API_BASE_URL}/api/admin/contacts/${id}`,
  
  // Public Blog endpoints
  BLOG_LIST: `${API_BASE_URL}/api/blog`,
  BLOG_CATEGORIES: `${API_BASE_URL}/api/blog/categories`,
  BLOG_TAGS: `${API_BASE_URL}/api/blog/tags`,
  BLOG_BY_SLUG: (slug) => `${API_BASE_URL}/api/blog/${slug}`,
  BLOG_LIKE: (id) => `${API_BASE_URL}/api/blog/${id}/like`,
  BLOG_COMMENT: (id) => `${API_BASE_URL}/api/blog/${id}/comment`,
  
  // Public Portfolio endpoints
  PORTFOLIO_LIST: `${API_BASE_URL}/api/portfolio`,
  PORTFOLIO_CATEGORIES: `${API_BASE_URL}/api/portfolio/categories`,
  PORTFOLIO_BY_SLUG: (slug) => `${API_BASE_URL}/api/portfolio/${slug}`,
  
  // Public Services endpoints
  SERVICES_LIST: `${API_BASE_URL}/api/services`,
  SERVICE_BY_SLUG: (slug) => `${API_BASE_URL}/api/services/${slug}`,
  
  // Public Career endpoints
  CAREER_LIST: `${API_BASE_URL}/api/careers`,
  CAREER_BY_SLUG: (slug) => `${API_BASE_URL}/api/careers/${slug}`,
  CAREER_APPLY: (id) => `${API_BASE_URL}/api/careers/${id}/apply`,
  
  // Contact endpoints
  CONTACT_SUBMIT: `${API_BASE_URL}/api/contact`,
  
  // Auth endpoints
  USER_REGISTER: `${API_BASE_URL}/api/auth/register`,
  USER_LOGIN: `${API_BASE_URL}/api/auth/login`,
  USER_PROFILE: `${API_BASE_URL}/api/auth/me`,
  USER_UPDATE_PROFILE: `${API_BASE_URL}/api/auth/profile`,
  USER_CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
};

// Helper function to make API calls with proper error handling
export const apiCall = async (url, options = {}) => {
  try {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
    
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default API_BASE_URL;
