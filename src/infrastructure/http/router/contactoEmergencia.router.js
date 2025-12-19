const express = require('express');
const router = express.Router();

const {
    obtenerContactos,
    obtenerContacto,
    crearContacto,
    actualizarContacto,
    eliminarContacto
} = require('../controllers/contactoEmergencia.controller');

// Obtener todos los contactos de emergencia de un cliente
router.get('/cliente/:idCliente', obtenerContactos);

// Obtener un contacto específico
router.get('/:id', obtenerContacto);

// Crear nuevo contacto de emergencia
router.post('/crear', crearContacto);

// Actualizar un contacto de emergencia
router.put('/actualizar/:id', actualizarContacto);

// Eliminar un contacto de emergencia
router.delete('/eliminar/:id', eliminarContacto);

module.exports = router;
