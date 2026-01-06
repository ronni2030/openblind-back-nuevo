const puntoCriticoCtl = {};
const sql = require('../../database/connection/dataBase.sql');

async function ensureTable() {
    await sql.promise().query(`
        CREATE TABLE IF NOT EXISTS puntos_criticos (
            idPuntoCritico INT AUTO_INCREMENT PRIMARY KEY,
            nombrePunto VARCHAR(255) NOT NULL,
            descripcion TEXT,
            latitud DOUBLE,
            longitud DOUBLE,
            estadoPunto ENUM('activo','inactivo') DEFAULT 'activo',
            createPunto DATETIME DEFAULT NOW(),
            updatePunto DATETIME DEFAULT NOW()
        ) ENGINE=InnoDB;
    `);
}

puntoCriticoCtl.getAll = async (req, res) => {
    try {
        await ensureTable();
        const [rows] = await sql.promise().query(
            'SELECT * FROM puntos_criticos WHERE estadoPunto = "activo" ORDER BY createPunto DESC'
        );
        return res.json(rows);
    } catch (err) {
        console.error('Error al obtener puntos críticos:', err);
        return res.status(500).json({ message: 'Error al obtener puntos críticos', error: err.message });
    }
};

puntoCriticoCtl.getById = async (req, res) => {
    try {
        const { id } = req.params;
        await ensureTable();
        const [rows] = await sql.promise().query(
            'SELECT * FROM puntos_criticos WHERE idPuntoCritico = ? AND estadoPunto = "activo"',
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Punto crítico no encontrado' });
        return res.json(rows[0]);
    } catch (err) {
        console.error('Error al obtener punto crítico:', err);
        return res.status(500).json({ message: 'Error al obtener punto crítico', error: err.message });
    }
};

puntoCriticoCtl.create = async (req, res) => {
    try {
        const { nombre, descripcion, latitud, longitud } = req.body;
        if (!nombre) return res.status(400).json({ message: 'Nombre es obligatorio' });
        await ensureTable();
        const [result] = await sql.promise().query(
            `INSERT INTO puntos_criticos (nombrePunto, descripcion, latitud, longitud, createPunto, updatePunto) VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [nombre, descripcion || '', latitud || null, longitud || null]
        );
        return res.status(201).json({ id: result.insertId, nombre, descripcion, latitud, longitud });
    } catch (err) {
        console.error('Error al crear punto crítico:', err);
        return res.status(500).json({ message: 'Error al crear punto crítico', error: err.message });
    }
};

puntoCriticoCtl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, latitud, longitud } = req.body;
        if (!nombre) return res.status(400).json({ message: 'Nombre es obligatorio' });
        await ensureTable();
        const [result] = await sql.promise().query(
            `UPDATE puntos_criticos SET nombrePunto = ?, descripcion = ?, latitud = ?, longitud = ?, updatePunto = NOW() WHERE idPuntoCritico = ?`,
            [nombre, descripcion || '', latitud || null, longitud || null, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Punto crítico no encontrado' });
        return res.json({ id, nombre, descripcion, latitud, longitud });
    } catch (err) {
        console.error('Error al actualizar punto crítico:', err);
        return res.status(500).json({ message: 'Error al actualizar punto crítico', error: err.message });
    }
};

puntoCriticoCtl.remove = async (req, res) => {
    try {
        const { id } = req.params;
        await ensureTable();
        const [result] = await sql.promise().query(
            `UPDATE puntos_criticos SET estadoPunto = 'inactivo', updatePunto = NOW() WHERE idPuntoCritico = ?`,
            [id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Punto crítico no encontrado' });
        return res.json({ message: 'Punto crítico desactivado' });
    } catch (err) {
        console.error('Error al eliminar punto crítico:', err);
        return res.status(500).json({ message: 'Error al eliminar punto crítico', error: err.message });
    }
};

// Exportar también ensureTable para compatibilidad con llamadas desde otros controladores
puntoCriticoCtl.ensureTable = ensureTable;
module.exports = puntoCriticoCtl;
