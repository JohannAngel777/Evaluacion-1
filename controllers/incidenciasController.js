const incidencias = [];
let siguienteId = 1;

const crearIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;

    if (!empleado || !area || !descripcion || !prioridad) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (empleado.trim() === "" || area.trim() === "" || descripcion.trim() === "" || prioridad.trim() === "") {
        return res.status(400).json({ error: "No se permiten campos vacios" });
    }

    if (prioridad !== "Alta" && prioridad !== "Media" && prioridad !== "Baja") {
        return res.status(400).json({ error: "Prioridad invalida. Debe ser Alta, Media o Baja" });
    }

    const nuevaIncidencia = {
        id: siguienteId++,
        empleado,
        area,
        descripcion,
        prioridad,
        estado: "Pendiente"
    };

    incidencias.push(nuevaIncidencia);

    res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
};

const listarIncidencias = (req, res) => {
    res.json(incidencias);
};

const buscarIncidenciaPorId = (req, res) => {
    const id = parseInt(req.params.id);

    const incidencia = incidencias.find((inc) => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    res.json(incidencia);
};

const cambiarEstado = (req, res) => {
    const id = parseInt(req.params.id);
    const { estado } = req.body;

    const incidencia = incidencias.find((inc) => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    switch (estado) {
        case "Pendiente":
        case "En Proceso":
        case "Resuelta":
        case "Cancelada":
            incidencia.estado = estado;
            res.json({ mensaje: "Estado actualizado correctamente" });
            default:
            res.status(400).json({ mensaje: "Estado invalido." });
    }
};

const getEstadisticas = (req, res) => {
    const estadisticas = {
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter((inc) => inc.estado === "Pendiente").length,
        enProceso: incidencias.filter((inc) => inc.estado === "En Proceso").length,
        resueltas: incidencias.filter((inc) => inc.estado === "Resuelta").length,
        canceladas: incidencias.filter((inc) => inc.estado === "Cancelada").length
    };
    res.json(estadisticas);
};

const getClasificacion = (req, res) => {
    const id = parseInt(req.params.id);

    const incidencia = incidencias.find((inc) => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    let clasificacion;
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

module.exports = {
    crearIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstado,
    getEstadisticas,
    getClasificacion,
    incidencias
};