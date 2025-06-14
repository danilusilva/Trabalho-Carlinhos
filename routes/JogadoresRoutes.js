// Importando items essenciais
const express = require("express")
const mongoose = require("mongoose");
const router = express.Router()
const Jogadores = require("../models/Jogadores");

// Função para retorno padronizado de mensagem e dados
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
    try{
        const dados = await Jogadores.create(req.body);
        const response = RetornoPadronizado(dados, "Novo jogador adicionado!");
        // 201 é ideal para quando se cria algo
        res.status(201).json(response);
    }
    // Usei IA para me ajudar, mas tive a ideia própria que seria aqui aonde colocar as validações :D
    catch (err) {
        // Se o nome do error for "ValidationError"
        if (err.name === 'ValidationError') {
            // Validando qual campo falhou na validação e retornando sua mensagem padrão
            const erros = Object.values(err.errors).map(e => ({
                campo: e.path,
                mensagem: e.message
        }));
        // Retorna um status 400 e um json de falha
        return res.status(400).json({
            alert: "error",
            message: "Erro na validação dos dados.",
            // Puxa o tipo do erro
            errors: erros
        });
        }
        // Se tu estiver correto mas não funcionar retorna erro de servidor
        return res.status(500).json({
            alert: "error",
            message: "Erro interno no servidor.",
            error: err.message
        });
    }
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

// Exportando as rotas
module.exports = router