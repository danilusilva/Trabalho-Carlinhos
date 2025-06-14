const express = require("express")
const mongoose = require("mongoose");
const router = express.Router()
const Jogadores = require("../models/Jogadores");

function RetornoPadronizado(dados, mensagem = "Jogador encontrado!") {
    return retordoDado = {
        alert: dados.length === 0 ? "warning": "success",
        message: mensagem,
        data: dados
    }
}

// Listar contatos
router.get('/', async (req, res) => {
    const dados = await Jogadores.find();
    const response = RetornoPadronizado(dados, "Jogadores listados com sucesso!")
    return res.status(200).json(response);
})

// Criar contato
router.post('/', async (req, res) => {
    const dados = await Jogadores.create(req.body);
    const response = RetornoPadronizado(dados, "Novo jogador adicionado!");
    // 201 é ideal para quando se cria algo
    res.status(201).json(response);
})

//Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({"error": "Id de jogador enviado não é válido."})
        }
        const dados = await Jogadores.findById(req.params.id);
        if (!dados) {
            return res.status(404).json({ error: "Erro, não achamos seu jogador."})
        }
        const response = RetornoPadronizado(dados, "Jogador encontrado com sucesso!")
        return res.status(200).json(response)
    }
    catch (err) {
        res.status(404).json({"error": err.message})
    }
})

// Atualizar por ID
router.put('/:id', async (req, res) => {
    try{
        const dados = await Jogadores.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!dados){
            return res.status(404).json({"error": "Dados de jogador não encontrados para atualização."});
        }
        const response = RetornoPadronizado(dados, "Dados de jogador atualizados com sucesso!")
        return res.status(200).json(response);
    } catch (err) {
        return res.status(404).json({"error": err.message});
    }
})

// Delete por ID
router.delete('/:id', async (req, res) => {
    try{
        const dados = await Jogadores.findByIdAndDelete(req.params.id);
        if (!dados){
            return res.status(404).json({"error": "Jogador não encontrado para deletar."});
        }
        const response = RetornoPadronizado(dados, "Jogador deletado com sucesso!")
        return res.status(200).json(response);
    } catch (err) {
        return res.status(404).json({"error": err.message});
    }
})

module.exports = router