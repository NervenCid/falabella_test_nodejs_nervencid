<!--Aqui va la logica del componente-->
<script>
    //Importamos el 'store' de los estados
    import { searches, selectedArtistId } from "../store.js";

    //Datos del artista
    const artistData = $searches.find((item) => item._id === $selectedArtistId);

    //Albumes del artista
    const albums = artistData.albums;

</script>

<!-- Iteramos y mostramos las tarjetas -->
{#each albums as album}
    <div class="card mb-3 m-3" style="max-width: 255em;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src={album.images[0].url} class="card-img" alt="" />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h2 class="card-title">{album.name}</h2>
                    <p>
                        <a class="preview-link" href={album.uri} target="_blank" >Escuchar en Spotify</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
{/each}>

<!--Aqui van los estilos del componente-->
