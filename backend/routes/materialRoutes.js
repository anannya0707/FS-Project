const express = require('express');
const router = express.Router();
const controller = require('../controllers/materialController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const { validateMaterial } = require('../middlewares/validationMiddleware');

// All routes require authentication
router.use(verifyToken);

router.get('/', controller.getAllMaterials);
router.get('/:id', controller.getMaterialById);
router.post('/', checkRole(['admin', 'manager']), validateMaterial, controller.createMaterial);
router.put('/:id', checkRole(['admin', 'manager']), validateMaterial, controller.updateMaterial);
router.delete('/:id', checkRole(['admin']), controller.deleteMaterial);

module.exports = router;
