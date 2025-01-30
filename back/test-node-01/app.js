const express = require("express");
const app = express();
const PORT = 3001;

// http://mydnas:3001/user/10
app.get("/pedidos", (req, res) => {
  res.send("Bienvenido a los pedidos.");
  //DFSA
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});