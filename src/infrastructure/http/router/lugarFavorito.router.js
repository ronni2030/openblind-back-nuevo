const express = require('express');
const router = express.Router();

const {
    obtenerLugares,
    obtenerLugar,
    crearLugar,
    actualizarLugar,
    eliminarLugar
} = require('../controllers/lugarFavorito.controller');

// Obtener todos los lugares favoritos de un cliente
router.get('/cliente/:idCliente', obtenerLugares);

// Obtener un lugar favorito específico
router.get('/:id', obtenerLugar);

// Crear nuevo lugar favorito
router.post('/crear', crearLugar);

// Actualizar un lugar favorito
router.put('/actualizar/:id', actualizarLugar);

// Eliminar un lugar favorito
router.delete('/eliminar/:id', eliminarLugar);

module.exports = router;
