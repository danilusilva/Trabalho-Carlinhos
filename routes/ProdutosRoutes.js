const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Produtos = require("../models/Produtos");

//Padronizando o retorno das respostas da API
function RetornoPadronizado(
  dados,
  mensagem = "Operação realizada com sucesso!"
) {
  let alertStatus;
  let dataOutput;

  if (dados === null || dados === undefined) {
    alertStatus = "fail";
    dataOutput = null;
  } else if (Array.isArray(dados) && dados.length === 0) {
    alertStatus = "fail";
    dataOutput = [];
  } else {
    alertStatus = "success";
    dataOutput = dados;
  }

  return {
    alert: alertStatus,
    message: mensagem,
    data: dataOutput,
  };
}

// Definindo as rotas para os produtos
router.get("/", async (req, res) => {
  try {
    const dados = await Produtos.find();
    const response = RetornoPadronizado(
      dados,
      "Produtos listados com sucesso!"
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      alert: "error",
      message: "Erro interno no servidor ao listar produtos.",
      error: err.message,
    });
  }
});

// Rota para criar um novo produto
router.post("/", async (req, res) => {
  try {
    const dados = await Produtos.create(req.body);
    const response = RetornoPadronizado(dados, "Novo produto adicionado!");
    res.status(201).json(response);
  } catch (err) {
    if (err.name === "ValidationError") {
      const erros = Object.values(err.errors).map((e) => ({
        campo: e.path,
        mensagem: e.message,
      }));
      return res.status(400).json({
        alert: "fail",
        message:
          "Erro na validação dos dados. Por favor, verifique os campos obrigatórios.",
        errors: erros,
      });
    }
    return res.status(500).json({
      alert: "error",
      message: "Erro interno no servidor ao criar produto.",
      error: err.message,
    });
  }
});

// Rota para buscar um produto por ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        alert: "fail",
        message: "ID de produto inválido.",
        data: null,
      });
    }
    const dados = await Produtos.findById(req.params.id);

    if (!dados) {
      const response = RetornoPadronizado(
        null,
        "Erro: Produto não encontrado."
      );
      return res.status(404).json(response);
    }

    const response = RetornoPadronizado(
      dados,
      "Produto encontrado com sucesso!"
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      alert: "error",
      message: "Erro interno no servidor ao buscar produto por ID.",
      error: err.message,
    });
  }
});

// Rota para atualizar um produto por ID
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        alert: "fail",
        message: "ID de produto inválido para atualização.",
        data: null,
      });
    }

    const dados = await Produtos.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!dados) {
      const response = RetornoPadronizado(
        null,
        "Erro: Produto não encontrado para atualização."
      );
      return res.status(404).json(response);
    }

    const response = RetornoPadronizado(
      dados,
      "Dados de produto atualizados com sucesso!"
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      alert: "error",
      message: "Erro interno no servidor ao atualizar produto.",
      error: err.message,
    });
  }
});

// Rota para deletar um produto por ID
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        alert: "fail",
        message: "ID de produto inválido para exclusão.",
        data: null,
      });
    }

    const dados = await Produtos.findByIdAndDelete(req.params.id);

    if (!dados) {
      const response = RetornoPadronizado(
        null,
        "Erro: Produto não encontrado para exclusão."
      );
      return res.status(404).json(response);
    }

    const response = RetornoPadronizado(dados, "Produto deletado com sucesso!");
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      alert: "error",
      message: "Erro interno no servidor ao deletar produto.",
      error: err.message,
    });
  }
});

module.exports = router;
