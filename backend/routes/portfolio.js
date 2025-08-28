const express = require('express');
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get all active portfolio items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    let portfolioQuery = Portfolio.find(query)
      .sort({ order: 1, createdAt: -1 })
      .populate('client.name client.company');

    if (limit) {
      portfolioQuery = portfolioQuery.limit(parseInt(limit));
    }

    const portfolio = await portfolioQuery;

    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/portfolio/categories
// @desc    Get portfolio categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Portfolio.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/portfolio/:slug
// @desc    Get portfolio item by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/portfolio
// @desc    Create a new portfolio item
// @access  Private (Admin only)
router.post('/', adminAuth, [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['web', 'mobile', 'ai', 'saas', 'iot', 'uiux', 'marketing']).withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const portfolioData = req.body;
    
    // Generate slug from title if not provided
    if (!portfolioData.slug) {
      portfolioData.slug = portfolioData.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const portfolio = new Portfolio(portfolioData);
    await portfolio.save();

    res.status(201).json({
      message: 'Portfolio item created successfully',
      portfolio
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Portfolio item with this slug already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/portfolio/:id
// @desc    Update portfolio item
// @access  Private (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    res.json({
      message: 'Portfolio item updated successfully',
      portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
