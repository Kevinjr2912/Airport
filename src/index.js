const express = require('express');
const bodyParser = require('body-parser');
const publicacionesRoutes = require('./routes/publicaciones');
const reservationsRoutes = require('./routes/reservations');
const flightsRoutes = require('./routes/flights');

const app = express();
const port = 3000;

// Middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());

//usar las rutas de los items
app.use('/publicaciones', publicacionesRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/fligths', flightsRoutes);

//iniciar el servidor
app.listen(port, () =>{
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});



