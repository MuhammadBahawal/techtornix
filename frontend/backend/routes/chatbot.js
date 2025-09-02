const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Settings = require('../models/Settings');

// TechTornix-focused prompt engineering
const SYSTEM_PROMPT = `You are TechBot, an AI assistant for TechTornix, a leading technology company. Your role is to provide helpful, accurate, and positive information about TechTornix and technology topics.

COMPANY INFORMATION:
- Company: TechTornix
- Leadership: Muhammad Bahawal (CEO), Naveed Sarwar, Aroma Tariq (COO), Umair Arshad (CTO)
- Services: Custom software development, web applications, mobile apps, cloud solutions, AI integration, digital consulting
- Technologies: React, Node.js, Python, JavaScript, TypeScript, AI/ML, AWS, Azure, Google Cloud
- Contact: bahawal.dev@gmail.com, techtornix.com

RESPONSE GUIDELINES:
1. Always be positive, helpful, and professional
2. Focus on TechTornix services and technology topics
3. Politely redirect off-topic questions to company/tech topics
4. Use emojis appropriately to make responses engaging
5. Provide detailed, informative answers about our services
6. Encourage users to contact us for project discussions
7. Keep responses concise but comprehensive
8. Always maintain an enthusiastic tone about technology

TOPICS TO FOCUS ON:
- TechTornix company information and services
- Software development and programming
- Web development and mobile apps
- Cloud computing and deployment
- AI and machine learning
- Technology trends and best practices
- Project consultation and pricing

TOPICS TO REDIRECT:
- Weather, sports, politics, entertainment
- Personal advice, health, dating
- Non-technology related questions

Remember: You represent TechTornix, so always showcase our expertise and encourage potential clients to reach out!`;

// POST /api/chatbot/message - Send message to Gemini AI
router.post('/message', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get Gemini API key from settings
        const apiKeySetting = await Settings.findOne({ key: 'gemini_api_key' });

        if (!apiKeySetting || !apiKeySetting.value) {
            return res.status(500).json({
                error: 'Gemini API key not configured',
                response: "I'm currently experiencing technical difficulties. Please contact us directly at bahawal.dev@gmail.com for immediate assistance! 🔧"
            });
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(apiKeySetting.value);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Create the full prompt with system context
        const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question: ${message}\n\nResponse:`;

        // Generate response
        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        const text = response.text();

        res.json({
            success: true,
            response: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Gemini API Error:', error);

        // Provide fallback response
        const fallbackResponse = getFallbackResponse(req.body.message);

        res.status(500).json({
            error: 'Failed to generate response',
            response: fallbackResponse,
            fallback: true
        });
    }
});

// Fallback response function
function getFallbackResponse(message) {
    const msg = message.toLowerCase();

    if (msg.includes('techtornix') || msg.includes('company') || msg.includes('about')) {
        return "TechTornix is a leading technology company specializing in innovative software solutions, web development, and digital transformation. We're passionate about helping businesses leverage cutting-edge technology to achieve their goals! 🚀";
    }

    if (msg.includes('service') || msg.includes('what do you do')) {
        return "We offer comprehensive technology services including custom software development, web applications, mobile apps, cloud solutions, AI integration, and digital consulting. Our expert team delivers scalable, secure, and innovative solutions! 💻";
    }

    if (msg.includes('team') || msg.includes('who') || msg.includes('founder')) {
        return "Our leadership team includes Muhammad Bahawal (CEO), Naveed Sarwar, Aroma Tariq (COO), and Umair Arshad (CTO). We have a talented team of developers, designers, and technology experts committed to excellence! 👥";
    }

    if (msg.includes('contact') || msg.includes('reach') || msg.includes('email')) {
        return "You can reach us at bahawal.dev@gmail.com or visit our website at techtornix.com. We'd love to discuss how we can help with your technology needs! 📧";
    }

    return "I'm here to help with TechTornix services and technology topics. Please ask me about our company, services, or any tech-related questions! Feel free to contact us at bahawal.dev@gmail.com for direct assistance. 💡";
}

module.exports = router;
