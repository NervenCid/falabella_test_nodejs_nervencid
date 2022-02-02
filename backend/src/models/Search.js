
//Importamos el controlador de la base de datos (MONGODB)
//Donde 'Schema' es lo que se desea guardar de los datos
//y como guardalos
//Y 'model' es la forma en que mongoDB guardara esos datos
const {Schema, model} = require('mongoose');

//Creamos un nuevo 'Schema'
const searchSchema = new Schema({

    //Almacenamos el artista
    artistName: {type: String, required: true},
    //Datos del 'search'    
    albums: [{}]
} ,{
    timestamps: true
});

//Creamos un modelo con el 'Schema' y lo exportamos
module.exports = model('Search', searchSchema); 