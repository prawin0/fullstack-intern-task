const Template = require('../models/Template');

// GET /api/templates?search=&category=
exports.getTemplates = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (search) {
      const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ name: rx }, { description: rx }];
    }
    const templates = await Template.find(filter).sort({ createdAt: -1 });
    res.json(templates);
  } catch (err) {
    next(err);
  }
};

// GET /api/templates/categories
exports.getCategories = async (req, res, next) => {
  try {
    res.json(await Template.distinct('category'));
  } catch (err) {
    next(err);
  }
};

// GET /api/templates/:id
exports.getTemplateById = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    next(err);
  }
};
