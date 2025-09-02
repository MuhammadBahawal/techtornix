const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Settings = require('../../models/Settings');
const auth = require('../../middleware/auth');

// GET /api/admin/gemini/status - Get current API key status
router.get('/status', auth, async (req, res) => {
    try {
        const apiKeySetting = await Settings.findOne({ key: 'gemini_api_key' });

        res.json({
            success: true,
            hasApiKey: !!apiKeySetting?.value,
            keyPreview: apiKeySetting?.value ? `${apiKeySetting.value.substring(0, 8)}...` : null,
            lastUpdated: apiKeySetting?.updatedAt || null
        });
    } catch (error) {
        console.error('Error fetching API key status:', error);
        res.status(500).json({ error: 'Failed to fetch API key status' });
    }
});

// PUT /api/admin/gemini/update - Update API key
router.put('/update', auth, async (req, res) => {
    try {
        const { apiKey } = req.body;

        if (!apiKey || !apiKey.trim()) {
            return res.status(400).json({ error: 'API key is required' });
        }

        // Validate API key format (basic validation)
        if (!apiKey.startsWith('AIza') || apiKey.length < 30) {
            return res.status(400).json({ error: 'Invalid Gemini API key format' });
        }

        // Test the API key before saving
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            // Test with a simple prompt
            const result = await model.generateContent('Hello, respond with "API key is working"');
            const response = result.response.text();

            if (!response) {
                throw new Error('No response from Gemini API');
            }
        } catch (testError) {
            console.error('API key test failed:', testError);
            return res.status(400).json({
                error: 'Invalid API key - failed to connect to Gemini API',
                details: testError.message
            });
        }

        // Save or update the API key
        await Settings.findOneAndUpdate(
            { key: 'gemini_api_key' },
            {
                key: 'gemini_api_key',
                value: apiKey,
                updatedAt: new Date()
            },
            { upsert: true, new: true }
        );

        res.json({
            success: true,
            message: 'Gemini API key updated successfully',
            keyPreview: `${apiKey.substring(0, 8)}...`
        });

    } catch (error) {
        console.error('Error updating API key:', error);
        res.status(500).json({ error: 'Failed to update API key' });
    }
});

// POST /api/admin/gemini/test - Test API key
router.post('/test', auth, async (req, res) => {
    try {
        const { apiKey } = req.body;

        if (!apiKey || !apiKey.trim()) {
            return res.status(400).json({ error: 'API key is required' });
        }

        // Test the API key
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const testPrompt = 'You are TechBot for TechTornix. Respond with a brief greeting and mention that the API key test is successful.';
        const result = await model.generateContent(testPrompt);
        const response = result.response.text();

        res.json({
            success: true,
            message: 'API key test successful',
            testResponse: response,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('API key test failed:', error);
        res.status(400).json({
            error: 'API key test failed',
            details: error.message
        });
    }
});

// DELETE /api/admin/gemini/delete - Delete API key
router.delete('/delete', auth, async (req, res) => {
    try {
        await Settings.findOneAndDelete({ key: 'gemini_api_key' });

        res.json({
            success: true,
            message: 'Gemini API key deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting API key:', error);
        res.status(500).json({ error: 'Failed to delete API key' });
    }
});

module.exports = router;
