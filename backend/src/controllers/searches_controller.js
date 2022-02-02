//Importamos el modelo de datos desde 'models/Searches.js'
const Search = require('../models/Search');

//Importamos el generador de token de acceso
const generateToken = require('../helpers/generateToken');

//Importamos 'axios'
const axios = require('axios');

//Almacenamos en un objeto todas las funciones relacionadas con 'searches'
const searchesCtrl = {};

//Extreamos las credenciales de 'Spotify'
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

//Con la notacion a continuacion relacionamos las funciones con el objeto 'searchesCtrl'

//Funcion para obtener las busquedas
//searchesCtrl.getSearches = (req, res) => res.json({message : 'Metodo GET searches'});
searchesCtrl.getSearches = async (req, res) => { 
    //Hacemos una consulta en todos los datos de la coleccion 'Search'
    const searches = await Search.find().sort({ date: "desc" }).lean();
    //Devolvemos el resultado de la consulta
    res.json(searches); 
};

//Funcion para crear una nueva busqueda
//searchesCtrl.newSearch = (req, res) => res.json({message : 'Metodo POST Searches'});
searchesCtrl.newSearch = async(req, res) => {

    //Obtenemos el token de acceso
    const token = await generateToken(client_id, client_secret);

    //Obtenemos el 'artista' del 'req.body'
    const artist = req.body.artist;

    //Datos vacios
    let artist_id = '';
    let albums = [];

    //Procedemos a realizar la busqueda del 'id' del artista
    try {

        //Hacemos la peticion
        const response_artist_id = await axios(
            {
                method: 'get',
                url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&market=ES&limit=1`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
        });

        artist_id = response_artist_id.data.artists.items[0].id;
        
    } catch (error) {

        //In case of Error in the request
        console.log("Error en obtener el 'id' de artista: ", error);
        return 0;
        
    } 

    //Con el 'id' del artista obtenemos los albumes de dicho artista
    try {

        //Hacemos la peticion
        const response_albums = await axios(
            {
                method: 'get',
                url: `https://api.spotify.com/v1/artists/${artist_id}/albums?market=ES&limit=10`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
        });

        //Almacenamos los albumes en un array
        albums = response_albums.data.items;
        
    } catch (error) {

        //In case of Error in the request
        res.json({message: 'Error al consultar los albumes del artista'});
        
    }     

    //Si hay albumes
    if(albums.length > 0){
            
        //Creamos un objeto con los datos de la busqueda
        const newSearch = new Search({
            artistName: artist,
            albums: albums
        });
    
        //Guardamos los datos en la coleccion 'Search'
        newSearch.save();
            
        //Devolvemos al cliente
        res.json({message: 'Guardado de la busqueda con exito'});
                
    }else{

        //En caso de no haber albumes
        res.json({message: 'No hay albumes para el artista'});

    }

};

//Funcion para eliminar de la base de datos
searchesCtrl.deleteSearch = async(req, res) => {

    //Obtenemos el 'id' del 'req.params'
    const id = req.params.id;

    try{

        //Eliminamos el registro de la coleccion 'Search'
        await Search.findByIdAndDelete(id);

        //Devolvemos al cliente
        res.json({message: 'Eliminado con exito'});

    }catch(error){

         //En caso de no haber albumes
         res.json({message: 'Error en eliminacion'});

    };
    
};

//Exportamos el modulo
module.exports = searchesCtrl;