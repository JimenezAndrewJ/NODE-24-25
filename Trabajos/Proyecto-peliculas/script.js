document.addEventListener('DOMContentLoaded', () => {
    const peliculasContainer = document.getElementById('peliculas-container');
    const generoSelect = document.getElementById('genero');
    const ordenarBtn = document.getElementById('ordenar');
    const buscarInput = document.getElementById('buscar');
    const buscarBtn = document.getElementById('buscarBtn');
    const mensaje = document.getElementById('mensaje');

    let peliculas = [];
    let ordenAscendente = true;

    // Cargar el JSON
    fetch('peliculas.json')
        .then(response => response.json())
        .then(data => {
            peliculas = data;
            mostrarPeliculas(peliculas);
        })
        .catch(error => console.error('Error cargando el JSON:', error));

    // Mostrar películas
    function mostrarPeliculas(peliculas) {
        peliculasContainer.innerHTML = '';
        if (peliculas.length === 0) {
            mensaje.classList.remove('hidden');
        } else {
            mensaje.classList.add('hidden');
            peliculas.forEach(pelicula => {
                const peliculaDiv = document.createElement('div');
                peliculaDiv.classList.add('pelicula');
                peliculaDiv.innerHTML = `
                    <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="pelicula-imagen">
                    <h2>${pelicula.titulo}</h2>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p><strong>Año:</strong> ${pelicula.año}</p>
                `;
                peliculasContainer.appendChild(peliculaDiv);
            });
        }
    }

    // Filtrar por género
    generoSelect.addEventListener('change', () => {
        const genero = generoSelect.value;
        const peliculasFiltradas = genero === 'todos' ? peliculas : peliculas.filter(p => p.genero === genero);
        mostrarPeliculas(peliculasFiltradas);
    });

    // Ordenar por año
    ordenarBtn.addEventListener('click', () => {
        const peliculasOrdenadas = peliculas.slice().sort((a, b) => ordenAscendente ? a.año - b.año : b.año - a.año);
        ordenAscendente = !ordenAscendente;
        mostrarPeliculas(peliculasOrdenadas);
    });

    // Buscar por título
    buscarBtn.addEventListener('click', () => {
        const titulo = buscarInput.value.toLowerCase();
        const peliculasFiltradas = peliculas.filter(p => p.titulo.toLowerCase().includes(titulo));
        mostrarPeliculas(peliculasFiltradas);
    });
});