const Poliza = require("../models/poliza");
const mongoose = require("mongoose");

// Crear póliza
exports.crearPoliza = async (req, res) => {
  try {
    const poliza = await Poliza.create(req.body);
    res.status(201).json({ msg: "Póliza creada correctamente", poliza });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las pólizas
exports.obtenerPolizas = async (req, res) => {
  try {
    const polizas = await Poliza.find();
    res.json(polizas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener póliza por ID
exports.obtenerPolizaPorId = async (req, res) => {
  try {
    const poliza = await Poliza.findById(req.params.id);
    if (!poliza) return res.status(404).json({ msg: "Póliza no encontrada" });
    res.json(poliza);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar póliza (con validación de ObjectId)
exports.actualizarPoliza = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID no válido" });
  }

  try {
    const poliza = await Poliza.findByIdAndUpdate(id, req.body, { new: true });
    if (!poliza) return res.status(404).json({ msg: "Póliza no encontrada" });
    res.json({ msg: " Póliza actualizada correctamente", poliza });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar póliza (con validación de ObjectId)
exports.eliminarPoliza = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID no válido" });
  }

  try {
    const poliza = await Poliza.findByIdAndDelete(id);
    if (!poliza) return res.status(404).json({ msg: "Póliza no encontrada" });
    res.json({ msg: " Póliza eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
