const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidenciasController');

router.post('/', incidenciasController.crearIncidencia); 

module.exports = router;