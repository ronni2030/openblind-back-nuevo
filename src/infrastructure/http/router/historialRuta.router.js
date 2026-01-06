const express = require('express');
const router = express.Router();
const { guardarRuta, obtenerHistorial, toggleFavorita, eliminarRuta } = require('../controllers/historialRuta.controller');

// Ruta para Guardar nueva ruta
router.post('/guardar', guardarRuta);

// Ruta para Obtener historial de un usuario
router.get('/historial/:userId', obtenerHistorial);

// Ruta para Marcar/Desmarcar favorita
router.put('/favorita/:idRuta', toggleFavorita);

// Ruta para Eliminar del historial
router.delete('/eliminar/:idRuta', eliminarRuta);

module.exports = router;
