const express = require('express');
const router = express.Router();
const { getAllUsers, registerUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const { validateRegistration } = require('../middlewares/validationMiddleware');

router.get('/', verifyToken, checkRole(['admin']), getAllUsers);
router.post('/register', validateRegistration, registerUser);

module.exports = router;
