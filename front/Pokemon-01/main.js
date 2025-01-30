let urlObtenerListaPokemon = 'https://pokeapi.co/api/v2/pokemon/';

function cargarPeliculas(){
    alert("Llego a la funcion jAVASCRIPT")
    // Llamamos a la API de pokemon con Fetch
    fetch("http://127.0.0.1:3000/peliculas/drama")
    //fetch(urlObtenerListaPokemon)
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
      

            //poner el codigo aqui
            //HUELE A SKILL DE EVALUACION
        });
}