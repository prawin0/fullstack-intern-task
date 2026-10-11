const router = require('express').Router();
const { register, login, me } = require('../controllers/authController');
const { registerRules, loginRules, handleValidation } = require('../middleware/validate');
const auth = require('../middleware/auth');

router.post('/register', registerRules, handleValidation, register);
router.post('/login', loginRules, handleValidation, login);
router.get('/me', auth, me);

module.exports = router;
