//Importamos el enrutador desde express
const {Router} = require('express');

//Ejecutamos la funcion y creamos un objeto 'router'
const router = Router();

//Importamos las funciones dentro del archivo 'searches_controller.js'
const {
    getSearches,
    newSearch,
    deleteSearch
} = require('../controllers/searches_controller');

//Creamos la ruta principal '/'
router.route('/')
    //Metodo 'get'
    //.get((req, res)=>res.send('GET - Ruta a searches'))
    .get(getSearches);

//Creamos la ruta search '/search'
router.route('/search')
    //Metodo 'post'
    //.post((req, res)=>res.send('POST - Ruta a searches'))
    .post(newSearch);

//Creamos la ruta para eliminar segun el 'id'
router.route('/:id')
    //Metodo 'delete'
    //.delete((req, res)=>res.send('DELETE - Ruta a searches'))
    .delete(deleteSearch);

//Exportamos el modulo
module.exports = router;