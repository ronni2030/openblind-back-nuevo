// src/infrastructure/http/router/configPantallas.router.js
'use strict';

const express = require('express');
const router = express.Router();
const configPantallasController = require('../controllers/configPantallas.controller');

/**
 * Router para Configuración de Pantallas
 * 
 * Endpoints:
 * GET    /api/config/pantallas           - Obtener configuración completa
 * PUT    /api/config/pantallas           - Actualizar configuración
 * PATCH  /api/config/pantallas/field     - Actualizar campo específico
 * POST   /api/config/pantallas/reset     - Resetear configuración
 */

// GET /api/config/pantallas
router.get('/pantallas', configPantallasController.getConfiguracion);

// PUT /api/config/pantallas
router.put('/pantallas', configPantallasController.updateConfiguracion);

// PATCH /api/config/pantallas/field
router.patch('/pantallas/field', configPantallasController.updateConfigField);

// POST /api/config/pantallas/reset
router.post('/pantallas/reset', configPantallasController.resetConfiguracion);

module.exports = router;