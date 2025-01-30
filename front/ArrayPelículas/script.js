// Referencias a los elementos del DOM
const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const contenedorTitulos = document.getElementById('contenedor-titulos');
const contenedorFiltrado = document.getElementById('contenedor-filtrado');
const botonMostrarTitulos = document.getElementById('mostrar-titulos');
const botonFiltrarGenero = document.getElementById('filtrar-genero');

// Cargar el JSON y mostrar las películas
fetch('peliculas.json')
  .then((response) => response.json())
  .then((data) => {
    // Guardar el JSON en una variable global para reutilizar
    window.peliculas = data;

    // Mostrar todas las películas
    let htmlContent = '';
    for (let i = 0; i < data.length; i++) {
      htmlContent += `<p><strong>${data[i].titulo}</strong> - Año: ${data[i].año}, Género: ${data[i].genero}</p>`;
    }
    contenedorPeliculas.innerHTML = htmlContent;
  });

// Mostrar solo los títulos de las películas
botonMostrarTitulos.addEventListener('click', () => {
  if (!window.peliculas) return;

  let htmlContent = '';
  for (let i = 0; i < window.peliculas.length; i++) {
    htmlContent += `<p>${window.peliculas[i].titulo}</p>`;
  }
  contenedorTitulos.innerHTML = htmlContent;
});

// Filtrar las películas por género usando prompt
botonFiltrarGenero.addEventListener('click', () => {
  if (!window.peliculas) return;

  // Usamos prompt para pedir al usuario el género
  const generoSeleccionado = prompt('Ingrese el género para filtrar (Animación, Ciencia Ficción, Acción):');
  
  // Si el usuario no ingresa nada o cancela el prompt, no hacemos nada
  if (!generoSeleccionado) {
    alert('No se ha ingresado un género válido.');
    return;
  }

  // Filtrar las películas que coinciden con el género ingresado
  const peliculasFiltradas = window.peliculas.filter(pelicula => pelicula.genero.toLowerCase() === generoSeleccionado.toLowerCase());

  // Mostrar las películas filtradas
  let htmlContent = '';
  if (peliculasFiltradas.length === 0) {
    htmlContent = `<p>No hay películas de este género.</p>`;
  } else {
    for (let i = 0; i < peliculasFiltradas.length; i++) {
      htmlContent += `<p><strong>${peliculasFiltradas[i].titulo}</strong> - Año: ${peliculasFiltradas[i].año}, Género: ${peliculasFiltradas[i].genero}</p>`;
    }
  }
  contenedorFiltrado.innerHTML = htmlContent;
});
