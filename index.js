const express = require('express')
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use( express.static('public') );  // use es conocido como un midleware

// Lectura y parseo del body
app.use( express.json() );  // leer peticiones json para extraer su content

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );


app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
})


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});
