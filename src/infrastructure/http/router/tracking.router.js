const router = require("express").Router();
const pool = require("../../database/mysql");

// 📡 GET historial
router.get("/", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM tracking ORDER BY created_at DESC"
  );
  res.json(rows);
});

// 📍 GET ubicación actual (YA NO SIMULA)
router.post("/ubicacion", async (req, res) => {
  const { direccion } = req.body;

  const [result] = await pool.query(
    "INSERT INTO tracking (direccion, tipo) VALUES (?, 'ubicacion')",
    [direccion]
  );

  res.json({
    id: result.insertId,
    direccion,
    tipo: "ubicacion",
    created_at: new Date(),
  });
});

// 🧭 POST navegación
router.post("/navegacion", async (req, res) => {
  const { direccion } = req.body;

  const [result] = await pool.query(
    "INSERT INTO tracking (direccion, tipo) VALUES (?, 'navegacion')",
    [direccion]
  );

  res.json({
    id: result.insertId,
    direccion,
    tipo: "navegacion",
    created_at: new Date(),
  });
});

// ✏️ EDITAR
router.put("/:id", async (req, res) => {
  const { direccion } = req.body;

  await pool.query(
    "UPDATE tracking SET direccion = ? WHERE id = ?",
    [direccion, req.params.id]
  );

  res.json({ message: "Actualizado" });
});

// ❌ DELETE
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM tracking WHERE id = ?", [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;