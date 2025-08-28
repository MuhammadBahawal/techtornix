import { connectDB, corsMiddleware, handleError } from '../_middleware.js';
import mongoose from 'mongoose';

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  slug: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  featuredImage: { type: String },
  published: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  readTime: { type: Number }, // in minutes
  seoTitle: { type: String },
  seoDescription: { type: String }
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default async function handler(req, res) {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const { slug, category, featured, limit = 10, page = 1 } = req.query;
      
      if (slug) {
        // Get single blog post
        const blog = await Blog.findOne({ slug, published: true });
        if (!blog) {
          return res.status(404).json({ message: 'Blog post not found' });
        }
        
        // Increment views
        blog.views += 1;
        await blog.save();
        
        res.status(200).json(blog);
      } else {
        // Get multiple blog posts
        let query = { published: true };
        
        if (category) {
          query.category = category;
        }
        
        if (featured === 'true') {
          query.featured = true;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const blogs = await Blog.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit));
          
        const total = await Blog.countDocuments(query);
        
        res.status(200).json({
          blogs,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          }
        });
      }

    } else if (req.method === 'POST') {
      const blogData = req.body;
      const blog = new Blog(blogData);
      await blog.save();
      res.status(201).json(blog);

    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    handleError(res, error, 'Blog operation failed');
  }
}
