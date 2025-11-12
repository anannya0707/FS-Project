const express = require('express');
const router = express.Router();
const { getAllRoles, addRole } = require('../controllers/roleController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const { validateRole } = require('../middlewares/validationMiddleware');

router.get('/', verifyToken, getAllRoles);
router.post('/', verifyToken, checkRole(['admin']), validateRole, addRole);

module.exports = router;
