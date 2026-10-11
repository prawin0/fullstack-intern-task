const Template = require('../models/Template');
const User = require('../models/User');

// GET /api/favorites
exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
};

// POST /api/favorites/:templateId
exports.addFavorite = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    const template = await Template.findById(templateId);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    // $addToSet keeps it idempotent (no duplicates)
    await User.updateOne({ _id: req.user._id }, { $addToSet: { favorites: template._id } });
    res.status(201).json({ message: 'Added to favorites', templateId });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/favorites/:templateId  (extra: lets users un-favorite)
exports.removeFavorite = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    await User.updateOne({ _id: req.user._id }, { $pull: { favorites: templateId } });
    res.json({ message: 'Removed from favorites', templateId });
  } catch (err) {
    next(err);
  }
};
