const express = require("express");
const app = express();
const port = 3000;
const {Pool} = require("pg");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const pool = new Pool({
    user: "postgres",
    host: "netflix-01.cbwogkym8g1j.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "Conejito_a1", // Considera usar variables de entorno para gestionar contraseñas
    port: 5432,
    ssl: {
      rejectUnauthorized: false, // Cambia a false si tienes problemas de certificados pero trata de evitarlo por seguridad
      // ca: fs.readFileSync('/path/to/server-ca.pem').toString(),
      // Es posible que AWS RDS requiera parámetros SSL específicos o archivos CA.
      // Comprueba la documentación de AWS RDS para obtener los detalles exactos.
    },
  });

  app.get("/peliculas", async (req, res)=>{
    const {rows} = await pool.query(
        "SELECT * FROM peliculas1;"
    );
    res.json(rows);
    // res.send("Bienvenido a mi API DISNEY");
});

app.get("/peliculas/drama", async (req, res)=>{
    const {rows} = await pool.query(
        "SELECT * FROM peliculas WHERE genero = 'Drama';"
    );
   res.json(rows);
    // res.send("Bienvenido a mi API DISNEY");
});

// Tu endpoint POST
app.post("/peliculas/insertar-pelicula", async (req, res) => {
    try {
        const { id, titulo, director, anio, genero } = req.body;

        const result = await pool.query(
            `INSERT INTO peliculas (id, titulo, director, anio, genero) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [id, titulo, director, anio, genero]
        );

        res.status(201).json(result.rows[0]); // Respuesta con la película insertada
    } catch (error) {
        console.error("Error al insertar película:", error);
        res.status(500).json({ error: "Error al insertar película" });
    }
});
app.get("/peliculas/:titulo", async (req, res)=>{
    const {titulo} = req.params;
    const {rows} = await pool.query(
        "SELECT * FROM peliculas1 WHERE TITULO = $1", [titulo]
    )
    res.json(rows);
});


    // CONSULTAR -> SELECT * FROM USUARIOS, PELICULAS
    app.get("/usuarios/", (req, res) =>{
        // req -> no lo necesito
        // res -> sí
        res.send('Has solicitado una lista de usuarios');
    }); 

    app.get("/usuarios/:id", (req, res) =>{
        const userId = req.params.id;
        res.send(`El ID del usuario es: ${userId}`);
    });

    // ----
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
      });
    // LOGIN, PELÍCULAS POR CATEGORÍAS
        // ADD -> INSERT
        //     app.post("/usuarios/", (req, res)); 
    // ELIMINAR -> DELETE                            
        // app.delete("/usuarios/", (req, res)); 
    // MODIFICAR -> UPDATE
        // app.put("/usuarios/", (req, res));    


