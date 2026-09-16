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

module.exports = {
    crearIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    incidencias
};