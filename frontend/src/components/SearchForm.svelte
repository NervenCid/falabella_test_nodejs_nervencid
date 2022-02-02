<!--Aqui va la logica del componente-->
<script>

    //Importamos la navegacion
    import { useNavigate, useLocation } from "svelte-navigator";

    //Instanciamos la navegacion
    const navigate = useNavigate();
    const location = useLocation();

    //Creamos una variable vacia para almacenar el dato
	let search = {
    	artist: ""
	};

    //Ejecutamos esta funcion cuando se envie el formulario
	const handleSubmit = async (e) =>{

        try {

            //Configuramos la peticion
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(search)
            };  

            //Hacemos la peticion
            const response = await fetch('http://localhost:4000/api/search', settings )
            
            //Limpiamos		
            search = { artist: "" };

            console.log("Enviado: ", await response.json());

            //Navegamos al inicio
            const from = ($location.state && $location.state.from) || "/";
            navigate(from, { replace: true });
            
        } catch (error) {

            console.log("Error: ", error);
            
        }

    }

</script>

<!--Creamos un 'form' que es el componente-->
<!--Evitamos que se cargue la pagina al enviar el formulario con 'preventDefault'-->
<form on:submit|preventDefault ={handleSubmit} class="card card-body col-md-6 offset-md-3 m-3">
	
    <!--Creamos una entrada de texto con 'bind:value' realcionamos
	con el valor 'search.artist'-->
	<div class="form-group m-3">
		<input
        bind:value={search.artist}
		type="text"
		placeholder="Escriba un artista"
		class="form-control"
		>
	</div>

	<button class="btn btn-success">
		
		<!--Crear un nuevo dato-->
		<i class="material-icons" style="vertical-align:middle;">Guardar</i>		
			
	</button>
	
</form>