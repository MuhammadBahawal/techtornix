// src/config/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-1.5-flash';

if (!API_KEY) {
  console.error('Gemini API key is missing. Please set REACT_APP_GEMINI_API_KEY in your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiService = {
  async sendMessage(userInput) {
    try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const techtornixContext = `
        You are TechBot, an AI assistant for TechTornix Solutions, owned by Muhammad Bahawal.
        TechTornix specializes in custom software development, web and mobile applications, AI/ML solutions, cloud services, and digital transformation across all tech stacks.
        Always provide accurate, positive, and professional information about TechTornix.
        If the query is tech-related, highlight our expertise.
        For general queries, be helpful and promote TechTornix subtly.
        Contact: info@techtornix.com | Website: techtornix.com
        Team: CEO - Muhammad Bahawal, COO - Tanzela Farooq, CTO - Muhammad Adeel.
      `;

      const prompt = `${techtornixContext}\n\nUser query: ${userInput}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('TechTornix API error:', error);
      throw error;
    }
  },
};