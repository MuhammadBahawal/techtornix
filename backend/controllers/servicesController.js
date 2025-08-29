const { validationResult } = require('express-validator');
const Service = require('../models/Service');

class ServicesController {
  async getAllServices(req, res) {
    try {
      const { category, featured, limit } = req.query;
      let query = { isActive: true };

      if (category && category !== 'all') {
        query.category = category;
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      let servicesQuery = Service.find(query).sort({ order: 1, createdAt: -1 });

      if (limit) {
        servicesQuery = servicesQuery.limit(parseInt(limit));
      }

      const services = await servicesQuery;

      res.json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getServiceBySlug(req, res) {
    try {
      const service = await Service.findOne({ 
        slug: req.params.slug, 
        isActive: true 
      });

      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      res.json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Admin Service Management
  async createService(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const serviceData = req.body;
      
      // Generate slug from title if not provided
      if (!serviceData.slug) {
        serviceData.slug = serviceData.title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }

      const service = new Service(serviceData);
      await service.save();

      res.status(201).json({
        message: 'Service created successfully',
        service
      });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Service with this slug already exists' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateService(req, res) {
    try {
      const service = await Service.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      res.json({
        message: 'Service updated successfully',
        service
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteService(req, res) {
    try {
      const service = await Service.findByIdAndDelete(req.params.id);

      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getServiceById(req, res) {
    try {
      const service = await Service.findById(req.params.id);

      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      res.json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getAllServicesAdmin(req, res) {
    try {
      const { page = 1, limit = 10, status } = req.query;
      let query = {};

      if (status) {
        query.isActive = status === 'active';
      }

      const pageSize = parseInt(limit);
      const skip = (parseInt(page) - 1) * pageSize;

      const services = await Service.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);

      const total = await Service.countDocuments(query);

      res.json({
        services,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / pageSize),
          total
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new ServicesController();
