// Admin Data Management System
// This manages all admin data using localStorage for simplicity

const STORAGE_KEYS = {
  JOBS: 'admin_jobs',
  APPLICATIONS: 'admin_applications',
  BLOGS: 'admin_blogs',
  PORTFOLIO: 'admin_portfolio',
  SERVICES: 'admin_services',
  TEAM: 'admin_team',
  CLIENTS: 'admin_clients',
  CONTACTS: 'admin_contacts',
  SETTINGS: 'admin_settings'
};

// Initialize default data
const initializeDefaultData = () => {
  // Default jobs
  if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
    const defaultJobs = [
      {
        id: '1',
        title: 'Senior React Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        status: 'active',
        description: 'We are looking for a Senior React Developer to join our team.',
        requirements: ['3+ years React experience', 'JavaScript/TypeScript', 'Node.js knowledge'],
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Onsite',
        type: 'Full-time',
        status: 'active',
        description: 'Creative UI/UX Designer needed for innovative projects.',
        requirements: ['Figma/Adobe XD', 'Portfolio required', '2+ years experience'],
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(defaultJobs));
  }

  // Default blogs
  if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
    const defaultBlogs = [
      {
        id: '1',
        title: 'The Future of Web Development',
        slug: 'future-of-web-development',
        excerpt: 'Exploring upcoming trends in web development and technology.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        author: 'Techtornix Team',
        category: 'Technology',
        tags: ['web development', 'technology', 'future'],
        status: 'published',
        featuredImage: '/images/blog/web-dev-future.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(defaultBlogs));
  }

  // Default portfolio
  if (!localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
    const defaultPortfolio = [
      {
        id: '1',
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Modern e-commerce solution built with React and Node.js',
        category: 'Web Development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        client: 'TechCorp Inc.',
        projectUrl: 'https://example.com',
        githubUrl: 'https://github.com/example',
        images: ['/images/portfolio/ecommerce-1.jpg'],
        status: 'completed',
        startDate: '2024-01-01',
        endDate: '2024-03-01',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(defaultPortfolio));
  }

  // Default services
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    const defaultServices = [
      {
        id: '1',
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom web applications using modern technologies',
        shortDescription: 'Modern web solutions',
        icon: 'FiCode',
        features: ['Responsive Design', 'SEO Optimized', 'Fast Performance'],
        technologies: ['React', 'Node.js', 'MongoDB'],
        pricing: 'Starting from $2000',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        description: 'Native and cross-platform mobile applications',
        shortDescription: 'iOS & Android apps',
        icon: 'FiSmartphone',
        features: ['Cross-platform', 'Native Performance', 'App Store Ready'],
        technologies: ['React Native', 'Flutter', 'Swift'],
        pricing: 'Starting from $3000',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(defaultServices));
  }

  // Default team
  if (!localStorage.getItem(STORAGE_KEYS.TEAM)) {
    const defaultTeam = [
      {
        id: '1',
        name: 'Muhammad Bahawal',
        position: 'CEO & Founder',
        bio: 'Experienced software engineer with 5+ years in web development.',
        image: '/images/team/bahawal.jpg',
        email: 'bahawal@techtornix.com',
        linkedin: 'https://linkedin.com/in/bahawal',
        github: 'https://github.com/bahawal',
        skills: ['React', 'Node.js', 'Leadership'],
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(defaultTeam));
  }

  // Default clients
  if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
    const defaultClients = [
      {
        id: '1',
        name: 'TechCorp',
        logo: '/images/clients/techcorp.png',
        website: 'https://techcorp.com',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'InnovateLab',
        logo: '/images/clients/innovatelab.png',
        website: 'https://innovatelab.com',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(defaultClients));
  }

  // Default settings
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    const defaultSettings = {
      company: {
        name: 'Techtornix',
        tagline: 'Innovation & Technology',
        description: 'Leading software house delivering cutting-edge solutions',
        address: '2nd Floor, Paradise Workspace, Main Boulevard Road, Faisal Rasheed Rd, Opposite Chase Value, near McDonald\'s, Faisalabad, 38000',
        phone: '+92 910 132 9836',
        email: 'info@techtornix.com',
        website: 'https://techtornix.com'
      },
      social: {
        facebook: 'https://www.facebook.com/profile.php?id=61574180353179',
        twitter: 'https://www.linkedin.com/company/techtornix-solutions',
        linkedin: 'https://www.linkedin.com/company/techtornix-solutions',
        instagram: 'https://instagram.com/techtornixsolutions',
        github: 'https://github.com/techtornix/'
      },
      branding: {
        logo: '/images/logo.png',
        favicon: '/favicon.ico',
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6'
      }
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  }

  // Initialize empty applications
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify([]));
  }

  // Initialize empty contact messages
  if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([]));
  }
};

// Generic CRUD operations
export const adminDataManager = {
  // Initialize data
  init: initializeDefaultData,

  // Get all items
  getAll: (type) => {
    const key = STORAGE_KEYS[type.toUpperCase()];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  // Get item by ID
  getById: (type, id) => {
    const items = adminDataManager.getAll(type);
    return items.find(item => item.id === id);
  },

  // Create new item
  create: (type, item) => {
    const items = adminDataManager.getAll(type);
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    const key = STORAGE_KEYS[type.toUpperCase()];
    localStorage.setItem(key, JSON.stringify(items));
    return newItem;
  },

  // Update item
  update: (type, id, updates) => {
    const items = adminDataManager.getAll(type);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      const key = STORAGE_KEYS[type.toUpperCase()];
      localStorage.setItem(key, JSON.stringify(items));
      return items[index];
    }
    return null;
  },

  // Delete item
  delete: (type, id) => {
    const items = adminDataManager.getAll(type);
    const filteredItems = items.filter(item => item.id !== id);
    const key = STORAGE_KEYS[type.toUpperCase()];
    localStorage.setItem(key, JSON.stringify(filteredItems));
    return true;
  },

  // Get settings
  getSettings: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {};
  },

  // Update settings
  updateSettings: (updates) => {
    const currentSettings = adminDataManager.getSettings();
    const newSettings = { ...currentSettings, ...updates };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    return newSettings;
  }
};

// Initialize default data on import
adminDataManager.init();

export default adminDataManager;
