<!--Aqui va la logica del componente-->
<script>

    //Importamos 'onMount'
    import { onMount } from 'svelte';

    //Importamos la navegacion
    import { useNavigate, useLocation } from "svelte-navigator";

    //Instanciamos la navegacion
    const navigate = useNavigate();
    const location = useLocation();

    //Importamos el 'store' de los estados
    import { searches, selectedArtistId } from '../store.js';

    //Creamos un arreglo vacio para almacenar el dato
	let searches_result = [];

    //Con esta funcion vemos los detalles de la busqueda
	const searchDetails = async(id) =>{

        //Almacenamos el id en el store
        selectedArtistId.set(id);

        //Navegamos a detalles
        const from = ($location.state && $location.state.from) || "/detail";
        navigate(from, { replace: true });

    }

    //Con esta funcion eliminamos un dato de la base de datos
	const deleteSearch = async(id) =>{

        let response = [];

        try {

            //Configuramos la peticion http
            const settings = {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                }
            };  

            //Hacemos la peticion
            response = await fetch(`http://localhost:4000/api/${id}`, settings );

            //Limpiamos
            searches.set($searches.filter(search => search._id !== id));          

            searches_result = searches_result.filter(item => item._id !== id);

            console.log("Eliminado exitoso: ", response);            

        } catch (error) {

            console.log("Error: ", error);

        }               
                
	}

    //Ejecutamos cuando se monta el componente
    onMount(
        
        async() =>{

            let response = [];

            try {

                //Configuramos la peticion http
                const settings = {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    }
                };  

                //Hacemos la peticion
                response = await fetch('http://localhost:4000/api', settings );

            } catch (error) {

                console.log("Error: ", error);

            }        

            searches_result = await response.json();
            searches.set(searches_result);
            //console.log("searches: ", searches);

        }
    );

</script>

<!--Recorremos el arreglo para mostrarlo en pantalla-->
{#each searches_result as search}
<div class="card card-body mt-2">
	<div class="d-flex justify-content-between">		
		<h5>{search.artistName}</h5>		
	</div>
	<!--<p>{task.description}</p>-->
	<!--Boton de Eliminar dato-->    
	<button on:click={searchDetails(search._id)} class="btn btn-info m-3">
		<i class="material-icons" style="vertical-align:middle;">Ver Albumes</i>
	</button>
    <button on:click={deleteSearch(search._id)} class="btn btn-danger m-3">
		<i class="material-icons" style="vertical-align:middle;">Eliminar</i>
	</button>
</div>
{/each}

