// Importando mongoose para definir o schema
const mongoose = require("mongoose");

// Criando o schema dos produtos
const ProdutosSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O campo nome é obrigatório!"],
      validate: {
        validator: function (valor) {
          return valor.trim().length > 0;
        },
        message: "O nome não pode estar vazio ou conter apenas espaços!",
      },
    },
    quantidade: { type: Number, required: true },
    valor: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Exportando o schema dos Jogadores
module.exports = mongoose.model("Produtos", ProdutosSchema);
