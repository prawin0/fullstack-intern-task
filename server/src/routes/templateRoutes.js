const router = require('express').Router();
const { getTemplates, getCategories, getTemplateById } = require('../controllers/templateController');

router.get('/', getTemplates);
router.get('/categories', getCategories); // must be before '/:id'
router.get('/:id', getTemplateById);

module.exports = router;
