const express = require('express');
const router = express.Router();
const participanteController = require('../controllers/participanteController');

router.route('/')
    .get(participanteController.getAllParticipantes)
    .post(participanteController.createParticipante);

router.route('/:nombre')
    .get(participanteController.getParticipante)
    .patch(participanteController.updateParticipante)
    .delete(participanteController.deleteParticipante);

router.route('/:nombre/tentacion')
    .patch(participanteController.addTentacion);

router.route('/estado/:estado')
    .get(participanteController.getParticipantesByEstado);

module.exports = router;