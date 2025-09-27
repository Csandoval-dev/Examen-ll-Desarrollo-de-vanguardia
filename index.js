const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error en conexión:", err));

// Rutas
const polizaRoutes = require("./routes/polizaRoutes");
app.use("/api/polizas", polizaRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
