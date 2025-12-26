const express = require('express');
const router = express.Router();

const {
    create,
    getByUserId,
    update,
    updateField,
    reset,
    delete: deleteConfig,
    list
} = require('../controllers/configuracion.controller');

// ═══════════════════════════════════════════════════
// RUTAS CRUD DE CONFIGURACIÓN
// ═══════════════════════════════════════════════════

// GET /api/configuracion - Listar todas (admin)
router.get('/', list);

// GET /api/configuracion/:userId - Obtener configuración de un usuario
router.get('/:userId', getByUserId);

// POST /api/configuracion - Crear configuración inicial
router.post('/', create);

// PUT /api/configuracion/:userId - Actualizar configuración completa
router.put('/:userId', update);

// PATCH /api/configuracion/:userId/field - Actualizar solo un campo
router.patch('/:userId/field', updateField);

// POST /api/configuracion/:userId/reset - Resetear a valores por defecto
router.post('/:userId/reset', reset);

// DELETE /api/configuracion/:userId - Eliminar configuración
router.delete('/:userId', deleteConfig);

module.exports = router;
