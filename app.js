//importar el express
const express = require('express');
const app = express();
//importar las rutas y el controlador de incidencias
const incidenciasRoutes = require("./routes/incidencias");
const incidenciasController = require("./controllers/incidenciasController");
//el puerto donde se ejecutara el servidor
const port = 3124;
//express entienda archivos json
app.use(express.json());
//definir las rutas para incidencias y estadisticas
app.use("/incidencias", incidenciasRoutes);
app.get("/estadisticas", incidenciasController.getEstadisticas);
//iniciar el servidor en el puerto asignado y mostrar un mensaje en la terminal
// que te diga que el servidor esta corriendo y en que puerto
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
}); 