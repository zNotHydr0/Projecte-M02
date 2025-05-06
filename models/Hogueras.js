const mongoose = require('mongoose');

const hogueraSchema = new mongoose.Schema({
    participante: { 
        type: String, 
        required: [true, 'El nombre del participante es obligatorio'] 
    },
    pareja_presente: { 
        type: String, 
        required: [true, 'El nombre de la pareja presente es obligatorio'] 
    },
    tentacion_presente: { 
        type: String, 
        required: [true, 'El nombre de la tentación presente es obligatorio'] 
    },
    reaccion: { 
        type: String, 
        enum: ['molestia', 'indiferencia', 'alegría', 'tristeza', 'ira'],
        required: [true, 'La reacción es obligatoria'] 
    },
    decision: { 
        type: String, 
        enum: ['seguir en pareja', 'romper pareja', 'explorar tentación'],
        required: [true, 'La decisión es obligatoria'] 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hoguera', hogueraSchema);