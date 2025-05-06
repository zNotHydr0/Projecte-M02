const mongoose = require('mongoose');

const participanteSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre del participante es obligatorio'],
        unique: true
    },
    edad: { 
        type: Number, 
        required: [true, 'La edad es obligatoria'],
        min: [18, 'La edad mínima es 18 años'] 
    },
    ciudad: { 
        type: String, 
        required: [true, 'La ciudad es obligatoria'] 
    },
    estado_actual: { 
        type: String, 
        enum: ['pareja', 'soltero', 'soltera'],
        required: [true, 'El estado actual es obligatorio'] 
    },
    pareja: { 
        type: String,
        default: null
    },
    tentaciones: [{ 
        type: String 
    }],
    infidelidades: { 
        type: Number, 
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Participante', participanteSchema);