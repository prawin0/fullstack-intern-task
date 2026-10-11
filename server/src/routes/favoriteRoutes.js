const router = require('express').Router();
const auth = require('../middleware/auth');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController');

router.use(auth); // every favorites route requires login

router.get('/', getFavorites);
router.post('/:templateId', addFavorite);
router.delete('/:templateId', removeFavorite);

module.exports = router;
