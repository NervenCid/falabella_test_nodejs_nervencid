import App from './App.svelte';

//Importamos 'bootswatch'
//OJO: Como es archivo de css debemos instalar
//el siguiente plugin
//>npm i rollup-plugin-css-only
//e INMEDIATAMENTE DESPUES en el archivo 'rollup.config.js' IMPORTARLO y CONFIGURARLO
//luego agragar la linea '<link rel="stylesheet" href="/build/extra.css" />'
//en el archivo 'index.html' dentro de la carpeta 'public'
import 'bootswatch/dist/lux/bootstrap.min.css';

//Importamos 'toastr' para mostrar notificaciones en pantalla
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';

//Esta es la aplicacion principal
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

//Exportamos el modulo
export default app;