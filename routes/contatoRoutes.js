const express = require("express")
const router = express.Router()
const Contatos = require('../models/Contato');
const { default: mongoose } = require("mongoose");
const Contato = require("../models/Contato");

function RetornoPadronizado(dados) {
    return retorno = {
        alert: dados.length === 0 ? "warning": "sucess",
        message: "Dado encontrado!",
        data: dados
    }
}

// Listar contatos
router.get('/', async (req, res) => {
    const dados = await Contatos.find();
    const response = RetornoPadronizado(dados)
    return res.status(200).json(response);
})

// Criar contato
router.post('/', async (req, res) => {
    const dados = await Contatos.create(req.body);
    const response = RetornoPadronizado(dados);
    res.status(200).json(response);
})

//Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({"error": "Id enviado não é válido."})
        }
        const dados = await Contatos.findById(req.params.id);
        if (!dados) {
            return res.status(404).json({ error: "erro, não achamos o id."})
        }
        const response = RetornoPadronizado(dados)
        return res.status(200).json(response)
    }
    catch (err) {
        res.status(404).json({"error": err.message})
    }
})

// Atualizar por ID
router.put('/:id', async (req, res) => {
    try{
        const dados = await Contato.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!dados){
            return res.status(404).json({"error": "Contato não encontrado."});
        }
        const response = RetornoPadronizado(dados)
        return res.status(200).json(response);
    } catch{
        return res.status(404).json({"error": err.message});
    }
})

// Delete por ID
router.delete('/:id', async (req, res) => {
    try{
        const dados = await Contato.findByIdAndDelete(req.params.id);
        if (!dados){
            return res.status(404).json({"error": "Contato não encontrado."});
        }
        const response = RetornoPadronizado(dados)
        return res.status(200).json(response);
    } catch{
        return res.status(404).json({"error": err.message});
    }
})

module.exports = router