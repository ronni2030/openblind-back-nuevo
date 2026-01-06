const express = require('express');
const router = express.Router();
const { guardarTarjeta, obtenerTarjeta } = require('../controllers/tarjetaMedica.controller');

// Ruta para Guardar (Crear o Editar)
// Método POST porque enviamos datos. El controlador decide si es INSERT o UPDATE
router.post('/guardar', guardarTarjeta);

// Ruta para Obtener
router.get('/obtener/:userId', obtenerTarjeta);

module.exports = router;