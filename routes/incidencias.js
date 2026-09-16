const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidenciasController');

router.post('/', incidenciasController.crearIncidencia);
router.get('/', incidenciasController.listarIncidencias);
router.get('/:id', incidenciasController.buscarIncidenciaPorId);
router.put('/:id/estado', incidenciasController.cambiarEstado);
router.get('/:id/clasificacion', incidenciasController.getClasificacion);

module.exports = router;
