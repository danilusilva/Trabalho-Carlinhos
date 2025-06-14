const mongoose = require('mongoose');

const JogadoresSchema = new mongoose.Schema(
    {
        nome: {type: String, required: true},
        ranking: {type: String, required: true},
        nacionalidade: {type: String, required: true},
        maiorrival: {type: String, required: true},
        contachess: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Jogadores', JogadoresSchema)