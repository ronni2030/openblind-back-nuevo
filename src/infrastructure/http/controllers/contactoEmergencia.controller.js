const contactoEmergenciaCtl = {};
const sql = require('../../database/connection/dataBase.sql');

// Mostrar todos los contactos de emergencia de un cliente
contactoEmergenciaCtl.obtenerContactos = async (req, res) => {
    try {
        const { idCliente } = req.params;

        const [contactos] = await sql.promise().query(
            'SELECT * FROM contactos_emergencia WHERE idCliente = ? ORDER BY prioridad ASC, createContactoEmergencia DESC',
            [idCliente]
        );

        return res.json(contactos);
    } catch (error) {
        console.error('Error al obtener contactos de emergencia:', error);
        return res.status(500).json({
            message: 'Error al obtener contactos de emergencia',
            error: error.message
        });
    }
};

// Obtener un contacto específico
contactoEmergenciaCtl.obtenerContacto = async (req, res) => {
    try {
        const { id } = req.params;

        const [contacto] = await sql.promise().query(
            'SELECT * FROM contactos_emergencia WHERE idContactoEmergencia = ?',
            [id]
        );

        if (contacto.length === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        return res.json(contacto[0]);
    } catch (error) {
        console.error('Error al obtener contacto:', error);
        return res.status(500).json({
            message: 'Error al obtener contacto',
            error: error.message
        });
    }
};

// Crear nuevo contacto de emergencia
contactoEmergenciaCtl.crearContacto = async (req, res) => {
    try {
        const { idCliente, nombreContacto, telefono, relacion, prioridad } = req.body;

        if (!idCliente || !nombreContacto || !telefono) {
            return res.status(400).json({
                message: 'idCliente, nombreContacto y telefono son obligatorios'
            });
        }

        const [result] = await sql.promise().query(
            `INSERT INTO contactos_emergencia
            (idCliente, nombreContacto, telefono, relacion, prioridad, createContactoEmergencia, updateContactoEmergencia)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [idCliente, nombreContacto, telefono, relacion || '', prioridad || 1]
        );

        return res.status(201).json({
            message: 'Contacto de emergencia creado exitosamente',
            idContactoEmergencia: result.insertId
        });

    } catch (error) {
        console.error('Error al crear contacto de emergencia:', error);
        return res.status(500).json({
            message: 'Error al crear contacto de emergencia',
            error: error.message
        });
    }
};

// Actualizar contacto de emergencia
contactoEmergenciaCtl.actualizarContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreContacto, telefono, relacion, prioridad } = req.body;

        if (!nombreContacto || !telefono) {
            return res.status(400).json({
                message: 'nombreContacto y telefono son obligatorios'
            });
        }

        const [result] = await sql.promise().query(
            `UPDATE contactos_emergencia SET
                nombreContacto = ?,
                telefono = ?,
                relacion = ?,
                prioridad = ?,
                updateContactoEmergencia = NOW()
            WHERE idContactoEmergencia = ?`,
            [nombreContacto, telefono, relacion || '', prioridad || 1, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        return res.json({ message: 'Contacto actualizado exitosamente' });

    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        return res.status(500).json({
            message: 'Error al actualizar contacto',
            error: error.message
        });
    }
};

// Eliminar contacto de emergencia
contactoEmergenciaCtl.eliminarContacto = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await sql.promise().query(
            'DELETE FROM contactos_emergencia WHERE idContactoEmergencia = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        return res.json({ message: 'Contacto eliminado exitosamente' });

    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        return res.status(500).json({
            message: 'Error al eliminar contacto',
            error: error.message
        });
    }
};

module.exports = contactoEmergenciaCtl;
