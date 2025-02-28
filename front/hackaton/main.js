const URL = "http://127.0.0.1:3000";  // Corrige la URL
const POST_LOGIN = URL + "/api/login";

async function login() {
    // Obtener los valores de los inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const contenedor = document.getElementById('contenedor');
    const boton=document.getElementById('boton');
    // Validar que los campos no estén vacíos
    if (!username || !password) {
        alert("Por favor, ingresa usuario y contraseña.");
        return;
    }

    try {
        // Hacer la petición al servidor
        const response = await fetch(POST_LOGIN,     {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Corrección en la cabecera
            },
            body: JSON.stringify({ username, password }), // Enviar los datos correctamente
        });
        const data = await response.json(); // Obtener los datos de la respuesta

        if (response.ok) {
            alert("Inicio de sesión exitoso");
            console.log("Datos del usuario:", data);

            // Mostrar mensaje en el contenedor
            boton.addEventListener('click', () => {
                contenedor.innerHTML = `<p>Bienvenido, ${data.user.username}!</p>`;
            });
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
        alert("Ocurrió un error en la conexión.");
    }
}

// Agregar el evento al botón de login
document.getElementById('boton').addEventListener('click', login);
