// API Configuration
import axios from 'axios';

// API base URL - production configuration for techtornix.com
const API_BASE_URL = 'https://techtornix.com/api';

// Export the base URL for direct fetch usage
export { API_BASE_URL };

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout for shared hosting
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Enable credentials for CORS
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints matching PHP backend structure
export const API_ENDPOINTS = {
  // Auth endpoints
  ADMIN_LOGIN: '/auth/login',
  ADMIN_VERIFY_OTP: '/auth/verify-otp',
  ADMIN_LOGOUT: '/auth/logout',
  ADMIN_ME: '/auth/me',

  // Blog endpoints
  BLOGS: '/blogs',
  BLOG_BY_ID: (id) => `/blogs/${id}`,
  BLOG_CREATE: '/blogs',
  BLOG_UPDATE: (id) => `/blogs/${id}`,
  BLOG_DELETE: (id) => `/blogs/${id}`,

  // Products/Services endpoints
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCT_CREATE: '/products',
  PRODUCT_UPDATE: (id) => `/products/${id}`,
  PRODUCT_DELETE: (id) => `/products/${id}`,

  // Categories endpoints
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
  CATEGORY_CREATE: '/categories',
  CATEGORY_UPDATE: (id) => `/categories/${id}`,
  CATEGORY_DELETE: (id) => `/categories/${id}`,

  // Testimonials endpoints
  TESTIMONIALS: '/testimonials',
  TESTIMONIAL_BY_ID: (id) => `/testimonials/${id}`,
  TESTIMONIAL_CREATE: '/testimonials',
  TESTIMONIAL_UPDATE: (id) => `/testimonials/${id}`,
  TESTIMONIAL_DELETE: (id) => `/testimonials/${id}`,

  // Settings endpoints
  SETTINGS: '/settings',
  SETTINGS_UPDATE: '/settings',

  // Legacy endpoints for backward compatibility
  SERVICES_LIST: '/products',
  SERVICE_BY_SLUG: (slug) => `/products/${slug}`,
  BLOG_LIST: '/blogs',
  BLOG_BY_SLUG: (slug) => `/blogs/${slug}`,
  PORTFOLIO_LIST: '/products',
  PORTFOLIO_BY_SLUG: (slug) => `/products/${slug}`,
};

export default api;
