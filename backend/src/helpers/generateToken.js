//Obtenemos el token de acceso al API de Spotify

//Importamos el modulo para hacer peticiones http
const axios = require('axios');

//Este paquete sirve para convertir los query
const qs = require('qs');

//Con esta funcion obtenemos el token
async function getToken(client_id, client_secret){

    //Armamos las credenciales
    const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');
    
    try {

        //Hacemos la peticion
        const response_token = await axios(
            {
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Authorization': `Basic ${auth_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({'grant_type':'client_credentials'})
        });

        return response_token.data.access_token;

        
    } catch (error) {

        //In case of Error in the request
        console.log("Error generating Token: ", error);
        return 0;
        
    }

}

//Exportamos el modulo
module.exports = getToken;