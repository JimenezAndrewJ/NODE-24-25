//SIEMPRE 2 OBJETOS
    //EXPRESS
    //POOL
    //TODA PETICION CLIENTE SERVIDOR LLEBA ESTOS 2
    const express = require("express");
    const { Pool } = require("pg");
    const cors = require("cors"); // Importar cors

    //INSTANCIAR
    const app = express();
    const pool = new Pool({
        user: "postgres",
        host: "",
        database: "postgres",
        password: "", // Considera usar variables de entorno para gestionar contraseñas
        port: 5432,
        ssl: {
          rejectUnauthorized: false, // Cambia a false si tienes problemas de certificados pero trata de evitarlo por seguridad
          // ca: fs.readFileSync('/path/to/server-ca.pem').toString(),
          // Es posible que AWS RDS requiera parámetros SSL específicos o archivos CA.
          // Comprueba la documentación de AWS RDS para obtener los detalles exactos.
        },
      });

    // CORS 
        //
    app.use(cors());
    //JSON
    app.use(express.json());
    
    //GETTERS   //SELECTS
    /*
    app.get('/api/peliculas',async(req,res)=> {
        //RECUPERAR PARAMETROS SI CORRESPONDE
    })
    //PUTTERS   //UPDATE
    //POSTS     //INSERTS   LOGIN
app.post('/api/login',async(req,res)=> {
//RECUPERAR PARAMETROS SI CORRESPONDE
        // BODY.PARAMS
        // QUERY.PARAMS
        // PATH.PARAMS
        const {username, password} =req.body;
        const sqlQuery = `
            SELECT * FROM USUARIOS 
            WHERE USERNAME = $1 AND PASSWORD = $2
        `;
        const result = pool.query(sqlQuery,[username,password]);
        const user = result.row[0];
            user.username;
            user.password;
        const respuesta = "";
        respuesta+={message: 'Correcto'}
        res.json(respuesta)
        return res.json({ message: 'Correcto', user: { username: user.username } });

})
    //DELETES   DELETES
    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
*/
app.post('/api/login', async (req, res) => {
    try {
        // Extraer datos del body
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Faltan datos en la solicitud" });
        }

        // Hacer la consulta a la base de datos
        const sqlQuery = `SELECT * FROM USUARIOS WHERE USERNAME = $1 AND PASSWORD = $2`;
        const result = await pool.query(sqlQuery, [username, password]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const user = result.rows[0];

        return res.json({ message: "Correcto", user: { username: user.username } });

    } catch (error) {
        console.error("Error en /api/login:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});