//Con el modulo 'dotenv' importamos las variables de entorno
//contenidas dentro del archivo '.env'
//Se recomienda correr este proyecto con permisos de administrador
require('dotenv').config();

//Importamos 'app.js'
const app = require('./app');

//Importamos la conexion a la base de datos dentro de 'database.js'
require('./database');

//Creamos una funcion principal
async function main(){
    //Iniciamos el servidor
    await app.listen(app.get('port'));
    console.log('Servidor corriendo en el puerto: ', app.get('port'));
};


//Ejecutamos
main();