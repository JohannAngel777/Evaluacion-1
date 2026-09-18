// Router almacena todas las rutas de incidencias
const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidenciasController');

// Endpoints de incidencias
router.post('/', incidenciasController.crearIncidencia);
router.get('/', incidenciasController.listarIncidencias);
router.get('/:id', incidenciasController.buscarIncidenciaPorId);
router.put('/:id/estado', incidenciasController.cambiarEstado);
router.delete('/:id', incidenciasController.eliminarIncidencia);
router.get('/:id/clasificacion', incidenciasController.getClasificacion);

// Exporta las rutas hacia app.js
module.exports = router;
