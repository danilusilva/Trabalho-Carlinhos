// Importando mongoose para definir o schema
const mongoose = require('mongoose');

// Criando o schema dos jogadores
const JogadoresSchema = new mongoose.Schema(
    {
        nome: {
            type: String, 
            required: [true,"O campo nome é obrigatório!"],
            validate: {
                validator: function (valor) {
                    return valor.trim().length > 0;
                },
                message: "O nome não pode estar vazio ou conter apenas espaços!"
            }
        },
        ranking: {type: String, required: true},
        nacionalidade: {type: String, required: true},
        maiorrival: {type: String, required: false},
        contachess: {type: String, required: false}
    },
    {
        timestamps: true
    }
)

// Exportando o schema dos Jogadores
module.exports = mongoose.model('Jogadores', JogadoresSchema)