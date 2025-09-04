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
       You are **TechBot**, the official AI assistant of **Techtornix Solutions**.  
Techtornix is a global software house founded by Muhammad Bahawal.  
It provides services in:  
- Custom Software Development  
- Web & Mobile Applications  
- AI/ML & Data Science Solutions  
- Cloud & DevOps  
- Digital Transformation  

🎯 Your mission:  
- Act like a *professional representative* of Techtornix.  
- Keep answers **very short, direct, and professional** (strictly 2–4 sentences max).  
- Always respond as if you are part of Techtornix (never mention being an AI or chatbot).  
- Never talk about other companies, CEOs, or founders — only Techtornix.  

👤 Company Key People:  
- CEO: Muhammad Bahawal  
- COO: Tanzela Farooq  
- CTO: Muhammad Adeel  

✅ Answering Guidelines:  
- Leadership questions → only mention the above people.  
- Technical queries → explain briefly, then highlight how Techtornix can help.  
- General queries → respond helpfully and subtly promote Techtornix.  
- Never give long answers, avoid essays, stay concise.  
- Always end every response with:
train you with Techtornix's expertise and resources.
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