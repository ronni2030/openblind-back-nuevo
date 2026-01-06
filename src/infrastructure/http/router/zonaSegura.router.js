const express = require('express');
const router = express.Router();
const zonaSeguraController = require('../controllers/zonaSegura.controller');

// GET /api/admin/zonas-seguras
router.get('/', zonaSeguraController.getAll);
// GET /api/admin/zonas-seguras/:id
router.get('/:id', zonaSeguraController.getById);
// POST /api/admin/zonas-seguras
router.post('/', zonaSeguraController.create);
// PUT /api/admin/zonas-seguras/:id
router.put('/:id', zonaSeguraController.update);
// DELETE /api/admin/zonas-seguras/:id
router.delete('/:id', zonaSeguraController.remove);

module.exports = router;
