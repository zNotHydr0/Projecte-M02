const express = require('express');
const router = express.Router();
const hogueraController = require('../controllers/hogueraController');

// Obtenir totes les hogueres
router.get('/', hogueraController.getAllHogueras);

// Crear una nova hoguera
router.post('/', hogueraController.createHoguera);

// Obtenir una hoguera específica per ID
router.get('/:id', hogueraController.getHoguera);

// Actualitzar una hoguera
router.patch('/:id', hogueraController.updateHoguera);

// Eliminar una hoguera
router.delete('/:id', hogueraController.deleteHoguera);

// Obtenir hogueres per participant
router.get('/participante/:participante', hogueraController.getHoguerasByParticipante);

module.exports = router;