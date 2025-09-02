import { API_BASE_URL } from './api';

// Gemini API service functions
export const geminiService = {
    // Send message to Gemini API through PHP backend
    async sendMessage(message) {
        try {
            console.log('Sending message to Gemini API:', message);
            console.log('API URL:', `${API_BASE_URL}/gemini/chatbot`);

            const response = await fetch(`${API_BASE_URL}/gemini/chatbot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (data.success && data.response) {
                return data.response;
            } else {
                console.error('Invalid API response format:', data);
                throw new Error('Invalid response format from API');
            }
        } catch (error) {
            console.error('Gemini API Error:', error);
            console.log('Falling back to local responses');
            // Fallback to local responses if API fails
            return this.getFallbackResponse(message);
        }
    },

    // Fallback response system
    getFallbackResponse(message) {
        const msg = message.toLowerCase();

        if (msg.includes('techtornix') || msg.includes('company') || msg.includes('about')) {
            return "TechTornix is a leading technology company specializing in innovative software solutions, web development, and digital transformation. We're passionate about helping businesses leverage cutting-edge technology to achieve their goals! 🚀";
        }

        if (msg.includes('service') || msg.includes('what do you do')) {
            return "We offer comprehensive technology services including custom software development, web applications, mobile apps, cloud solutions, AI integration, and digital consulting. Our expert team delivers scalable, secure, and innovative solutions! 💻";
        }

        return "I'm here to help with TechTornix services and technology topics. Please ask me about our company, services, or any tech-related questions! 💡";
    }
};

// Admin API functions for managing Gemini API key
export const geminiAdminService = {
    // Get current API key status
    async getApiKeyStatus() {
        try {
            console.log('Fetching API key status from:', `${API_BASE_URL}/gemini/admin?action=status`);
            const response = await fetch(`${API_BASE_URL}/gemini/admin?action=status`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                },
            });
            console.log('API Key Status Response:', await response.json());
            return await response.json();
        } catch (error) {
            console.error('Error fetching API key status:', error);
            throw error;
        }
    },

    // Update API key
    async updateApiKey(apiKey) {
        try {
            console.log('Updating API key:', apiKey);
            console.log('API URL:', `${API_BASE_URL}/gemini/admin`);
            const response = await fetch(`${API_BASE_URL}/gemini/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ action: 'update_key', api_key: apiKey }),
            });
            console.log('Update API Key Response:', await response.json());
            return await response.json();
        } catch (error) {
            console.error('Error updating API key:', error);
            throw error;
        }
    },

    // Test API key
    async testApiKey(apiKey) {
        try {
            console.log('Testing API key:', apiKey);
            console.log('API URL:', `${API_BASE_URL}/gemini/admin`);
            const response = await fetch(`${API_BASE_URL}/gemini/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ action: 'test_key', api_key: apiKey }),
            });
            console.log('Test API Key Response:', await response.json());
            return await response.json();
        } catch (error) {
            console.error('Error testing API key:', error);
            throw error;
        }
    },

    // Get API logs
    async getApiLogs(limit = 50) {
        try {
            console.log('Fetching API logs from:', `${API_BASE_URL}/gemini/admin?action=logs&limit=${limit}`);
            const response = await fetch(`${API_BASE_URL}/gemini/admin?action=logs&limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                },
            });
            console.log('API Logs Response:', await response.json());
            return await response.json();
        } catch (error) {
            console.error('Error fetching API logs:', error);
            throw error;
        }
    },

    // Update Gemini settings (enable/disable)
    async updateSettings(settings) {
        try {
            console.log('Updating Gemini settings:', settings);
            console.log('API URL:', `${API_BASE_URL}/gemini/admin`);
            const response = await fetch(`${API_BASE_URL}/gemini/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ action: 'update_settings', ...settings }),
            });
            console.log('Update Gemini Settings Response:', await response.json());
            return await response.json();
        } catch (error) {
            console.error('Error updating settings:', error);
            throw error;
        }
    }
};
