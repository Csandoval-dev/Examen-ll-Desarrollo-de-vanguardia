const express = require("express");
const router = express.Router();
const controller = require("../controllers/polizaController");

// CRUD
router.post("/", controller.crearPoliza);          // Crear
router.get("/", controller.obtenerPolizas);        // Leer todos
router.get("/:id", controller.obtenerPolizaPorId); // Leer uno
router.put("/:id", controller.actualizarPoliza);   // Actualizar
router.delete("/:id", controller.eliminarPoliza);  // Eliminar

module.exports = router;
