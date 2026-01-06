const express = require('express');
const router = express.Router();
const puntoCriticoController = require('../controllers/puntoCritico.controller');

// GET /api/admin/puntos-criticos
router.get('/', puntoCriticoController.getAll);
// GET /api/admin/puntos-criticos/:id
router.get('/:id', puntoCriticoController.getById);
// POST /api/admin/puntos-criticos
router.post('/', puntoCriticoController.create);
// PUT /api/admin/puntos-criticos/:id
router.put('/:id', puntoCriticoController.update);
// DELETE /api/admin/puntos-criticos/:id
router.delete('/:id', puntoCriticoController.remove);

module.exports = router;
