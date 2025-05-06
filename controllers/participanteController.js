const Participante = require('../models/Participantes');

// Obtenir tots els participants
exports.getAllParticipantes = async (req, res) => {
    try {
        const participantes = await Participante.find();
        res.status(200).json({
            status: 'success',
            results: participantes.length,
            data: {
                participantes
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Obtenir un participant per nom
exports.getParticipante = async (req, res) => {
    try {
        const participante = await Participante.findOne({ nombre: req.params.nombre });
        
        if (!participante) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el participante con ese nombre'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                participante
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Crear un nou participant
exports.createParticipante = async (req, res) => {
    try {
        const nuevoParticipante = await Participante.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                participante: nuevoParticipante
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Actualitzar un participant
exports.updateParticipante = async (req, res) => {
    try {
        const participante = await Participante.findOneAndUpdate(
            { nombre: req.params.nombre }, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!participante) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el participante con ese nombre'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                participante
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Eliminar un participant
exports.deleteParticipante = async (req, res) => {
    try {
        const participante = await Participante.findOneAndDelete({ nombre: req.params.nombre });
        
        if (!participante) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el participante con ese nombre'
            });
        }

        // Eliminar también las hogueras relacionadas
        await mongoose.model('Hoguera').deleteMany({ participante: req.params.nombre });

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

// Afegir una temptació a un participant
exports.addTentacion = async (req, res) => {
    try {
        const participante = await Participante.findOneAndUpdate(
            { nombre: req.params.nombre },
            { $addToSet: { tentaciones: req.body.tentacion } },
            { new: true }
        );
        
        if (!participante) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el participante con ese nombre'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                participante
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Obtenir participants per estat
exports.getParticipantesByEstado = async (req, res) => {
    try {
        const participantes = await Participante.find({ estado_actual: req.params.estado });
        res.status(200).json({
            status: 'success',
            results: participantes.length,
            data: {
                participantes
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};