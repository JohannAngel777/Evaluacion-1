const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidenciasController');

router.post('/', incidenciasController.crearIncidencia);
router.get('/', incidenciasController.listarIncidencias);
router.get('/:id', incidenciasController.buscarIncidenciaPorId);
router.put('/:id/estado', incidenciasController.cambiarEstado);

module.exports = router;
