//Importamos express
const express=require('express');

//Importamos 'cors'
const cors = require('cors');

//Modulo para manejar rutas del sistema
const path = require("path");

//Ejecutamos 'express' y creamos la aplicacion
const app = express();

//Configuraciones
app.set('port', process.env.PORT || 4000); //Configuramos el puerto

//Middlewares: Son funciones que se ejecutan antes de las 'routes'
app.use(cors()); //Permitimos la comunicacion estre dos servidores en este caso con el servidor de svelte
app.use(express.json()); //Habilitamos que el servidor entienda formato 'json'
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "public"))); //Buscamos en la carpeta 'frontend' (afuera) la carpeta 'build' generada por 'svelte'

//Rutas o 'routes', en este caso usamos un 'api'
app.use('/api', require('./routes/searches')); //Ruta 'searches'

//Exportamos el modulo
module.exports=app;