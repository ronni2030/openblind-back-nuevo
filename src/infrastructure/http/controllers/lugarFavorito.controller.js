const lugarFavoritoCtl = {};
const sql = require('../../database/connection/dataBase.sql');

// Mostrar todos los lugares favoritos de un cliente
lugarFavoritoCtl.obtenerLugares = async (req, res) => {
    try {
        const { idCliente } = req.params;

        const [lugares] = await sql.promise().query(
            'SELECT * FROM lugares_favoritos WHERE idCliente = ? ORDER BY createLugarFavorito DESC',
            [idCliente]
        );

        return res.json(lugares);
    } catch (error) {
        console.error('Error al obtener lugares favoritos:', error);
        return res.status(500).json({
            message: 'Error al obtener lugares favoritos',
            error: error.message
        });
    }
};

// Obtener un lugar favorito específico
lugarFavoritoCtl.obtenerLugar = async (req, res) => {
    try {
        const { id } = req.params;

        const [lugar] = await sql.promise().query(
            'SELECT * FROM lugares_favoritos WHERE idLugarFavorito = ?',
            [id]
        );

        if (lugar.length === 0) {
            return res.status(404).json({ message: 'Lugar no encontrado' });
        }

        return res.json(lugar[0]);
    } catch (error) {
        console.error('Error al obtener lugar:', error);
        return res.status(500).json({
            message: 'Error al obtener lugar',
            error: error.message
        });
    }
};

// Crear nuevo lugar favorito
lugarFavoritoCtl.crearLugar = async (req, res) => {
    try {
        const { idCliente, nombreLugar, direccion, latitud, longitud, icono } = req.body;

        if (!idCliente || !nombreLugar || !direccion) {
            return res.status(400).json({
                message: 'idCliente, nombreLugar y direccion son obligatorios'
            });
        }

        const [result] = await sql.promise().query(
            `INSERT INTO lugares_favoritos
            (idCliente, nombreLugar, direccion, latitud, longitud, icono, createLugarFavorito, updateLugarFavorito)
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [idCliente, nombreLugar, direccion, latitud || null, longitud || null, icono || 'place']
        );

        return res.status(201).json({
            message: 'Lugar favorito creado exitosamente',
            idLugarFavorito: result.insertId
        });

    } catch (error) {
        console.error('Error al crear lugar favorito:', error);
        return res.status(500).json({
            message: 'Error al crear lugar favorito',
            error: error.message
        });
    }
};

// Actualizar lugar favorito
lugarFavoritoCtl.actualizarLugar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreLugar, direccion, latitud, longitud, icono } = req.body;

        if (!nombreLugar || !direccion) {
            return res.status(400).json({
                message: 'nombreLugar y direccion son obligatorios'
            });
        }

        const [result] = await sql.promise().query(
            `UPDATE lugares_favoritos SET
                nombreLugar = ?,
                direccion = ?,
                latitud = ?,
                longitud = ?,
                icono = ?,
                updateLugarFavorito = NOW()
            WHERE idLugarFavorito = ?`,
            [nombreLugar, direccion, latitud || null, longitud || null, icono || 'place', id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Lugar no encontrado' });
        }

        return res.json({ message: 'Lugar actualizado exitosamente' });

    } catch (error) {
        console.error('Error al actualizar lugar:', error);
        return res.status(500).json({
            message: 'Error al actualizar lugar',
            error: error.message
        });
    }
};

// Eliminar lugar favorito
lugarFavoritoCtl.eliminarLugar = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await sql.promise().query(
            'DELETE FROM lugares_favoritos WHERE idLugarFavorito = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Lugar no encontrado' });
        }

        return res.json({ message: 'Lugar eliminado exitosamente' });

    } catch (error) {
        console.error('Error al eliminar lugar:', error);
        return res.status(500).json({
            message: 'Error al eliminar lugar',
            error: error.message
        });
    }
};

module.exports = lugarFavoritoCtl;
