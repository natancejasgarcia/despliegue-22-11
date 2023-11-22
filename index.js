const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

let concesionarios = [
  {
    nombre: "Concesionario Central",
    direccion: "Calle Principal 123",
    coches: [
      { modelo: "Ford Mustang", cv: 300, precio: 35000 },
      { modelo: "Honda Civic", cv: 200, precio: 22000 },
    ],
  },
  {
    nombre: "Auto Lujo",
    direccion: "Avenida Libertad 456",
    coches: [
      { modelo: "Porsche 911", cv: 400, precio: 100000 },
      { modelo: "BMW M3", cv: 350, precio: 67000 },
    ],
  },
];

app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// GET /concesionarios
app.get("/concesionarios", (req, res) => {
  res.json(concesionarios);
});

// POST /concesionarios
app.post("/concesionarios", (req, res) => {
  concesionarios.push({ ...req.body, coches: [] });
  res.json({ message: "Concesionario creado" });
});

// GET /concesionarios/:id
app.get("/concesionarios/:id", (req, res) => {
  const concesionario = concesionarios[req.params.id];
  res.json(concesionario);
});

// PUT /concesionarios/:id
app.put("/concesionarios/:id", (req, res) => {
  concesionarios[req.params.id] = { ...concesionarios[req.params.id], ...req.body };
  res.json({ message: "Concesionario actualizado" });
});

// DELETE /concesionarios/:id
app.delete("/concesionarios/:id", (req, res) => {
  concesionarios = concesionarios.filter((_, index) => index != req.params.id);
  res.json({ message: "Concesionario eliminado" });
});

// GET /concesionarios/:id/coches
app.get("/concesionarios/:id/coches", (req, res) => {
  res.json(concesionarios[req.params.id].coches);
});

// POST /concesionarios/:id/coches
app.post("/concesionarios/:id/coches", (req, res) => {
  concesionarios[req.params.id].coches.push(req.body);
  res.json({ message: "Coche añadido" });
});

// GET /concesionarios/:id/coches/:cocheId
app.get("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const coche = concesionarios[req.params.id].coches[req.params.cocheId];
  res.json(coche);
});

// PUT /concesionarios/:id/coches/:cocheId
app.put("/concesionarios/:id/coches/:cocheId", (req, res) => {
  concesionarios[req.params.id].coches[req.params.cocheId] = req.body;
  res.json({ message: "Coche actualizado" });
});

// DELETE /concesionarios/:id/coches/:cocheId
app.delete("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const coches = concesionarios[req.params.id].coches;
  concesionarios[req.params.id].coches = coches.filter((_, index) => index != req.params.cocheId);
  res.json({ message: "Coche eliminado" });
});
