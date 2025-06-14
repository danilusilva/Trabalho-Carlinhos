require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const JogadoresRoutes = require("./routes/JogadoresRoutes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Conectado"))
    .catch((err) => console.log("MongoDB não conectado:", err));

app.use('/', JogadoresRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});