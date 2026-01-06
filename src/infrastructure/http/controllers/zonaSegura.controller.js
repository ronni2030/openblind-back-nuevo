const zonaSeguraCtl = {};
const sql = require('../../database/connection/dataBase.sql');

// Asegurar que exista la tabla
async function ensureTable() {
    await sql.promise().query(`
        CREATE TABLE IF NOT EXISTS zonas_seguras (
            idZonaSegura INT AUTO_INCREMENT PRIMARY KEY,
            nombreZona VARCHAR(255) NOT NULL,
            descripcion TEXT,
            latitud DOUBLE,
            longitud DOUBLE,
            estadoZona ENUM('activo','inactivo') DEFAULT 'activo',
            createZona DATETIME DEFAULT NOW(),
            updateZona DATETIME DEFAULT NOW()
        ) ENGINE=InnoDB;
    `);
}

// Obtener todas las zonas seguras activas
zonaSeguraCtl.getAll = async (req, res) => {
    try {
        await ensureTable();
        const [rows] = await sql.promise().query(
            'SELECT * FROM zonas_seguras WHERE estadoZona = "activo" ORDER BY createZona DESC'
        );
        return res.json(rows);
    } catch (err) {
        console.error('Error al obtener zonas seguras:', err);
        return res.status(500).json({ message: 'Error al obtener zonas seguras', error: err.message });
    }
};

// Obtener por id
zonaSeguraCtl.getById = async (req, res) => {
    try {
        const { id } = req.params;
        await ensureTable();
        const [rows] = await sql.promise().query(
            'SELECT * FROM zonas_seguras WHERE idZonaSegura = ? AND estadoZona = "activo"',
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Zona segura no encontrada' });
        return res.json(rows[0]);
    } catch (err) {
        console.error('Error al obtener zona segura:', err);
        return res.status(500).json({ message: 'Error al obtener zona segura', error: err.message });
    }
};

// Crear zona segura
zonaSeguraCtl.create = async (req, res) => {
    try {
        const { nombre, descripcion, latitud, longitud } = req.body;
        if (!nombre) return res.status(400).json({ message: 'Nombre es obligatorio' });
        await ensureTable();
        const [result] = await sql.promise().query(
            `INSERT INTO zonas_seguras (nombreZona, descripcion, latitud, longitud, createZona, updateZona) VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [nombre, descripcion || '', latitud || null, longitud || null]
        );
        return res.status(201).json({ id: result.insertId, nombre, descripcion, latitud, longitud });
    } catch (err) {
        console.error('Error al crear zona segura:', err);
        return res.status(500).json({ message: 'Error al crear zona segura', error: err.message });
    }
};

// Actualizar zona segura
zonaSeguraCtl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, latitud, longitud } = req.body;
        if (!nombre) return res.status(400).json({ message: 'Nombre es obligatorio' });
        await ensureTable();
        const [result] = await sql.promise().query(
            `UPDATE zonas_seguras SET nombreZona = ?, descripcion = ?, latitud = ?, longitud = ?, updateZona = NOW() WHERE idZonaSegura = ?`,
            [nombre, descripcion || '', latitud || null, longitud || null, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Zona segura no encontrada' });
        return res.json({ id, nombre, descripcion, latitud, longitud });
    } catch (err) {
        console.error('Error al actualizar zona segura:', err);
        return res.status(500).json({ message: 'Error al actualizar zona segura', error: err.message });
    }
};

// Eliminar (soft delete)
zonaSeguraCtl.remove = async (req, res) => {
    try {
        const { id } = req.params;
        await ensureTable();
        const [result] = await sql.promise().query(
            `UPDATE zonas_seguras SET estadoZona = 'inactivo', updateZona = NOW() WHERE idZonaSegura = ?`,
            [id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Zona segura no encontrada' });
        return res.json({ message: 'Zona segura desactivada' });
    } catch (err) {
        console.error('Error al eliminar zona segura:', err);
        return res.status(500).json({ message: 'Error al eliminar zona segura', error: err.message });
    }
};

// Exportar también ensureTable para compatibilidad con llamadas desde otros controladores
zonaSeguraCtl.ensureTable = ensureTable;
module.exports = zonaSeguraCtl;
