const historialCtl = {};
const orm = require('../../database/connection/dataBase.orm');
const sql = require('../../database/connection/dataBase.sql');

// Guardar nueva ruta
historialCtl.guardarRuta = async (req, res) => {
    try {
        const { userId, origen, destino, fecha } = req.body;

        if (!userId || !origen || !destino) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        const nuevaRuta = await orm.historialRuta.create({
            userIdUser: userId,
            origen,
            destino,
            fecha: fecha || new Date().toLocaleString(),
            esFavorita: false
        });

        return res.status(201).json({
            message: 'Ruta guardada en historial',
            data: nuevaRuta
        });

    } catch (error) {
        console.error('Error al guardar ruta:', error);
        return res.status(500).json({ message: 'Error interno', error: error.message });
    }
};

// Obtener historial
historialCtl.obtenerHistorial = async (req, res) => {
    try {
        const { userId } = req.params;

        // Buscar rutas ordenadas por ID descendente (más recientes primero)
        const historial = await orm.historialRuta.findAll({
            where: { userIdUser: userId },
            order: [['idRuta', 'DESC']],
            limit: 20 // Limitamos a las últimas 20 para no sobrecargar
        });

        // Mapeamos para el frontend si es necesario, o lo enviamos directo
        // El frontend espera: { id, origin, destination, date, isFavorite }
        const historialFormateado = historial.map(h => ({
            id: h.idRuta,
            origin: h.origen,
            destination: h.destino,
            date: h.fecha,
            isFavorite: h.esFavorita
        }));

        return res.json(historialFormateado);

    } catch (error) {
        console.error('Error al obtener historial:', error);
        return res.status(500).json({ message: 'Error al obtener historial', error: error.message });
    }
};

// Marcar como favorita
historialCtl.toggleFavorita = async (req, res) => {
    try {
        const { idRuta } = req.params;
        const { esFavorita } = req.body;

        await orm.historialRuta.update(
            { esFavorita },
            { where: { idRuta } }
        );

        return res.json({ message: 'Estado de favorita actualizado' });

    } catch (error) {
        console.error('Error al actualizar favorita:', error);
        return res.status(500).json({ message: 'Error al actualizar', error: error.message });
    }
};

// Eliminar ruta
historialCtl.eliminarRuta = async (req, res) => {
    try {
        const { idRuta } = req.params;

        await orm.historialRuta.destroy({
            where: { idRuta }
        });

        return res.json({ message: 'Ruta eliminada del historial' });

    } catch (error) {
        console.error('Error al eliminar ruta:', error);
        return res.status(500).json({ message: 'Error al eliminar', error: error.message });
    }
};

module.exports = historialCtl;
