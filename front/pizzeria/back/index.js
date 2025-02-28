require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.get("/peliculas", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM peliculas");
      res.json(result.rows);
    } catch (error) {
      console.error("Error al obtener películas:", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  });
  
  app.get("/genero/:nombre", async (req, res) => {
    try {
        const param1 = req.params.nombre
        const consulta = `SELECT *
                            FROM peliculas p 
                            INNER JOIN GENERO g ON p.genero = g.id 
                            WHERE UPPPER(g.titulo) LIKE UPPER('%$1%');`;
         //const endSql = " '%" + param1 + "%' "
        const result = await pool.query(consulta, [param1]);
      res.json(result.rows);
    } catch (error) {
      console.error("Error al obtener películas:", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  });
  app.get("/genero/Terror", async (req, res) => {
    try {
        const consulta = `SELECT * 
                            FROM PELICULAS p
                            INNER JOIN GENERO g ON p.genero_id = g.id 
                            WHERE UPPER(g.titulo) LIKE '%TERROR%';`;
        const result = await pool.query(consulta);
      res.json(result.rows);
    } catch (error) {
      console.error("Error al obtener películas:", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  });