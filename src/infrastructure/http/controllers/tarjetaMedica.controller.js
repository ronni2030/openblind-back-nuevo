const tarjetaCtl = {};
const orm = require('../../database/connection/dataBase.orm');
const sql = require('../../database/connection/dataBase.sql');

// Guardar (Crear o Actualizar) Tarjeta Médica
tarjetaCtl.guardarTarjeta = async (req, res) => {
    try {
        const { userId, nombresCompletos, tipoSangre, alergias } = req.body;

        // Validaciones básicas
        if (!userId || !nombresCompletos || !tipoSangre) {
            return res.status(400).json({
                message: 'Faltan datos requeridos: userId, nombresCompletos y tipoSangre son obligatorios'
            });
        }

        // Buscar si el usuario ya tiene una tarjeta
        const tarjetaExistente = await orm.tarjetaMedica.findOne({
            where: { userIdUser: userId }
        });

        const fechaActual = new Date().toLocaleString();

        if (tarjetaExistente) {
            // ACTUALIZAR
            await tarjetaExistente.update({
                nombresCompletos,
                tipoSangre,
                alergias: alergias || '',
                updateTarjeta: fechaActual
            });

            return res.status(200).json({
                message: 'Tarjeta médica actualizada exitosamente',
                data: tarjetaExistente,
                timestamp: fechaActual
            });
        } else {
            // CREAR
            const nuevaTarjeta = await orm.tarjetaMedica.create({
                userIdUser: userId,
                nombresCompletos,
                tipoSangre,
                alergias: alergias || '',
                createTarjeta: fechaActual,
                updateTarjeta: fechaActual // Inicialmente igual a la creación
            });

            return res.status(201).json({
                message: 'Tarjeta médica creada exitosamente',
                data: nuevaTarjeta,
                timestamp: fechaActual
            });
        }

    } catch (error) {
        console.error('Error al guardar tarjeta médica:', error);
        return res.status(500).json({
            message: 'Error interno al guardar la tarjeta médica',
            error: error.message
        });
    }
};

// Obtener Tarjeta Médica por Usuario
tarjetaCtl.obtenerTarjeta = async (req, res) => {
    try {
        const { userId } = req.params;

        const tarjeta = await orm.tarjetaMedica.findOne({
            where: { userIdUser: userId }
        });

        if (!tarjeta) {
            return res.status(404).json({ message: 'El usuario no tiene tarjeta médica registrada' });
        }

        return res.status(200).json({
            success: true,
            data: tarjeta
        });

    } catch (error) {
        console.error('Error al obtener tarjeta médica:', error);
        return res.status(500).json({
            message: 'Error al obtener la información',
            error: error.message
        });
    }
};

module.exports = tarjetaCtl;
