const API_URL ="http://127.0.0.1:3000";
const GET_PELICULAS = API_URL + "/peliculas";
const GET_PELICULAS_BY_GENERO = API_URL + "";
const GET_PELICULAS_FAVORITAS = API_URL + "";
const INSERT_PELICULAS = API_URL + "";
const GET_USUARIOS = API_URL + "/usuarios/:id";

function getPeliculas(){
    alert('Paso 1');
    /*fetch ()
        .then()
        .then(
            (data)=> {
                
                }
        )
        .catch();*/
        fetch (GET_PELICULAS) //http://127.0.0.1:3000/peliculas
        .then(response => response.json())
        .then(
            (data) => {
                data[0].id;
                    let idPelicula = data[0].id;
                    let tituloPelicula = data[0].titulo;
            }
        )
        .catch();
}
