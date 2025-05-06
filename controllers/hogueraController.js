const Hoguera = require('../models/Hogueras');

// Obtenir totes les hogueres
exports.getAllHogueras = async (req, res) => {
    try {
        const hogueras = await Hoguera.find();
        res.status(200).json({
            status: 'success',
            results: hogueras.length,
            data: {
                hogueras
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Obtenir una hoguera per ID
exports.getHoguera = async (req, res) => {
    try {
        const hoguera = await Hoguera.findById(req.params.id);
        if (!hoguera) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la hoguera con ese ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                hoguera
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Obtenir hogueres per participant
exports.getHoguerasByParticipante = async (req, res) => {
    try {
        const hogueras = await Hoguera.find({ participante: req.params.participante });
        res.status(200).json({
            status: 'success',
            results: hogueras.length,
            data: {
                hogueras
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Crear una nova hoguera
exports.createHoguera = async (req, res) => {
    try {
        // Verificar si el participante existe
        const participanteExistente = await mongoose.model('Participante').findOne({ nombre: req.body.participante });
        if (!participanteExistente) {
            return res.status(404).json({
                status: 'fail',
                message: 'El participante no existe en la base de datos'
            });
        }

        const nuevaHoguera = await Hoguera.create(req.body);
        
        // Actualizar estadísticas del participante si es necesario
        if (req.body.decision === 'explorar tentación') {
            await mongoose.model('Participante').updateOne(
                { nombre: req.body.participante },
                { $inc: { infidelidades: 1 } }
            );
        }

        res.status(201).json({
            status: 'success',
            data: {
                hoguera: nuevaHoguera
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Actualitzar una hoguera
exports.updateHoguera = async (req, res) => {
    try {
        const hoguera = await Hoguera.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!hoguera) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la hoguera con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                hoguera
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Eliminar una hoguera
exports.deleteHoguera = async (req, res) => {
    try {
        const hoguera = await Hoguera.findByIdAndDelete(req.params.id);
        
        if (!hoguera) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la hoguera con ese ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};