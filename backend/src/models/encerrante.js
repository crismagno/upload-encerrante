const mongoose = require('mongoose')

const EncerranteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome do encerrante requerido!']
    },

    INICIO_JORNADAS: {
        type: Object,
        required: true
    },

    JORNADAS: [
        {
            type: Object,
            required: true 
        }
    ],

    RESUMO_JORNADAS: {
        type: Object,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    done: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Encerrante', EncerranteSchema)