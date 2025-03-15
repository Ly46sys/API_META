const express = require("express");
const apiruta = require("./routes/ruta.js");

require('dotenv').config(); // Cargar las variables de entorno
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN; // Leer el token desde .env
console.log("Tu token es:", process.env.WHATSAPP_TOKEN); // Para comprobar que funciona

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", apiruta);

app.listen(PORT, '0.0.0.0', () => {
    console.log("El puerto es: " + PORT);
});


//console.log("Hola levi");
