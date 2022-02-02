<!--Aqui va la logica del componente-->
<script>
	
	//Importamos los componentes
	import Form from "./components/SearchForm.svelte"; 
	import SearchList from "./components/SearchList.svelte";
	import SearchDetail from "./components/SearchDetail.svelte";

	//Importamos el Router
	import { Router, Route, Link } from "svelte-navigator";
	

</script>

<!--  -->
<Router>

	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">

		<div class="container-fluid">

			<Link class="navbar-brand" to="/">Spotify Finder</Link>
	
			<form class="d-flex">
	
				<ul class="navbar-nav me-auto">
	
					<li class="nav-item">
						<Link class="nav-link" to="/search">Nueva Busqueda</Link>
					</li>

					<li class="nav-item">
						<Link class="nav-link" to="/">Historial</Link>
					</li>
	
				</ul>
	
			</form>
	
		</div>

	</nav>

	<main>

		<Route path="/">
			<SearchList />
		</Route>

		<Route path="/search">
			<Form />
		</Route>

		<Route path="/detail">
			<SearchDetail />			
		</Route>

	</main>

</Router>

<!--Aqui van los estilos-->
<style>
	
</style>