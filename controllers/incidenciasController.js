//llamando a los helpers
const { buscarPorId } = require('../utils/helpers');
const incidencias = [];
let siguienteId = 1;

// Controladores para manejar las rutas de incidencias
const crearIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;

    if (!empleado || !area || !descripcion || !prioridad) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

// Validar que los campos no estén vacíos( que los helpers no esten vacios basicamente)
    if (empleado.trim() === "" || area.trim() === "" || descripcion.trim() === "" || prioridad.trim() === "") {
        return res.status(400).json({ error: "No se permiten campos vacios" });
    }

//validar que la prioridad sea una de las opciones válidas
    if (prioridad !== "Alta" && prioridad !== "Media" && prioridad !== "Baja") {
        return res.status(400).json({ error: "Prioridad invalida. Debe ser Alta, Media o Baja" });
    }
// Convertir la prioridad a minúsculas para evitar problemas de comparación
    const prioridadLower = prioridad.toLowerCase();
// Agregar la nueva incidencia al arreglo de incidencias
    const nuevaIncidencia = { 
        id: siguienteId++,
        empleado,
        area,
        descripcion,
        prioridad,
        estado: "Pendiente"
    };

    incidencias.push(nuevaIncidencia); //este inserta los datos obtenidos en el arreglo de incidencias
    res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
};
// Controlador para listar todas las incidencias
const listarIncidencias = (req, res) => {
    res.json(incidencias);
};
// Controlador para buscar una incidencia por su ID /incidencias/id
const buscarIncidenciaPorId = (req, res) => {
    const id = parseInt(req.params.id);

    const incidencia = buscarPorId(incidencias, id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    res.json(incidencia);
};

// controlador para cambiar el estado de una incidencia  /incidencias/id/estado
const cambiarEstado = (req, res) => {
    const id = parseInt(req.params.id);
    const { estado } = req.body;

    const incidencia = buscarPorId(incidencias, id);
// vlidar si la incidencia existe y si el estado es válido
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }
    if (!estado) {
        return res.status(400).json({ mensaje: "El campo estado es obligatorio" });
    }
//solo se aceptan los estados Pendiente, En Proceso, Resuelta o Cancelada, osino se devuelve un error 400
    switch (estado.toLowerCase()) {
        case "pendiente":
            incidencia.estado = "Pendiente";
            return res.json({ mensaje: "Estado actualizado correctamente" });
        case "en proceso":
            incidencia.estado = "En Proceso";
            return res.json({ mensaje: "Estado actualizado correctamente" });
        case "resuelta":
            incidencia.estado = "Resuelta";
            return res.json({ mensaje: "Estado actualizado correctamente" });
        case "cancelada":
            incidencia.estado = "Cancelada";
            return res.json({ mensaje: "Estado actualizado correctamente" });
        default:
            return res.status(400).json({ mensaje: "Estado invalido." });
    }
};

// Controlador para eliminar una incidencia por su ID /incidencias/id
const eliminarIncidencia = (req, res) => {
    const id = parseInt(req.params.id);

// Buscar el índice de la incidencia en el arreglo
    const index = incidencias.findIndex((inc) => inc.id === id);

//valida que el -1 no exista,osino devuelve error '404'
    if (index === -1) { 
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }
//y elimina exactamente un elemento de incidencias y devuelve un mensaje exitoso
    incidencias.splice(index, 1);
    res.json({ mensaje: "Incidencia eliminada correctamente" });
};

//Get estadisticas de incidencias
const getEstadisticas = (req, res) => {
//calcular el total de incidencias y el número de incidencias por estado
    const estadisticas = {
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter((inc) => inc.estado === "Pendiente").length,
        enProceso: incidencias.filter((inc) => inc.estado === "En Proceso").length,
        resueltas: incidencias.filter((inc) => inc.estado === "Resuelta").length,
        canceladas: incidencias.filter((inc) => inc.estado === "Cancelada").length
    };
    res.json(estadisticas);
};

//obtener la clasificación de una incidencia por su ID /incidencias/id/clasificacion
const getClasificacion = (req, res) => {
    const id = parseInt(req.params.id);//req.params.id es un string, por eso se convierte a entero con parseInt

    const incidencia = buscarPorId(incidencias, id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    let clasificacion;
//switch
    switch (incidencia.prioridad) {
        case "Alta":
            clasificacion = "Crítica";
            break;
        case "Media":
            clasificacion = "Importante";
            break;
        case "Baja":
            clasificacion = "Normal";
            break;
        default:
            clasificacion = "Desconocida";
    }

    res.json({ id: incidencia.id, clasificacion });
};
//hacer publicas las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
    crearIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstado,
    eliminarIncidencia,
    getEstadisticas,
    getClasificacion,
    incidencias
};