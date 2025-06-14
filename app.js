// Importando items
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const JogadoresRoutes = require("./routes/JogadoresRoutes");

// Criando uma instância do app express
const app = express();
app.use(express.json()); //Para interpretar requisições com corpo Json automaticamente

// Conecta ao banco do mongo
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Conectado"))
    .catch((err) => console.log("MongoDB não conectado:", err));

// Usa as rotas dos Jogadores
app.use('/', JogadoresRoutes);
const PORT = process.env.PORT || 3000;

// Inicia o serviço express na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});