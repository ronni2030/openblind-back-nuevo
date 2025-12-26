const express = require('express');
const router = express.Router();

const {
    create,
    getByUserId,
    update,
    updateField,
    reset,
    delete: deleteConfig,
    restore
} = require('../controllers/configuracion.controller');

// ═══════════════════════════════════════════════════
// RUTAS CRUD DE CONFIGURACIÓN (Usuario final, NO admin)
// ═══════════════════════════════════════════════════

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

// DELETE /api/configuracion/:userId - Eliminar configuración (borrado lógico)
router.delete('/:userId', deleteConfig);

// POST /api/configuracion/:userId/restore - Restaurar configuración eliminada
router.post('/:userId/restore', restore);

module.exports = router;
