/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)

let concesionarios = [
  {
    id: 1,
    nombre: "Concesionario 1",
    direccion: "Dirección 1",
    coches: [
      { marca: "Renault", modelo: "Clio" },
      { marca: "Nissan", modelo: "Skyline R34" },
    ],
  },
  {
    id: 2,
    nombre: "Concesionario 2",
    direccion: "Dirección 2",
    coches: [
      { marca: "Ferrari", modelo: "Clio" },
      { marca: "Audi", modelo: "Skyline R34" },
    ],
  },
  {
    id: 3,
    nombre: "Concesionario 3",
    direccion: "Dirección 3",
    coches: [
      { marca: "Renault", modelo: "Clio" },
      { marca: "Nissan", modelo: "Skyline R34" },
    ],
  },
  {
    id: 4,
    nombre: "Concesionario 4",
    direccion: "Dirección 44",
    coches: [
      { marca: "Ferrari", modelo: "Clio" },
      { marca: "Audi", modelo: "Skyline R34" },
    ],
  },
];
// Lista todos los coches
app.get("/concesionarios", (request, response) => {
  console.log("Accediendo a /concesionarios");
  console.log(concesionarios);
  response.json(concesionarios);
});

// Añadir un nuevo concesionario
app.post("/concesionarios", (request, response) => {
  console.log("Accediendo a /concesionarios");
  console.log(concesionarios);
  const nuevoConcesionario = request.body;

  // Encuentra el ID más alto actual en la lista de concesionarios
  const maxId = concesionarios.reduce((max, concesionario) => (concesionario.id > max ? concesionario.id : max), 0);

  // Asigna un nuevo ID que es uno más grande que el máximo actual
  nuevoConcesionario.id = maxId + 1;

  // Agrega el nuevo concesionario a la lista
  concesionarios.push(nuevoConcesionario);

  response.json({ message: "Concesionario creado", id: nuevoConcesionario.id });
});

// Obtener un solo coche
app.get("/concesionarios/:id", (request, response) => {
  console.log("Accediendo a /concesionarios");
  console.log(concesionarios);
  const id = parseInt(request.params.id);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (concesionario) {
    response.json(concesionario);
  } else {
    response.status(404).send("Concesionario no encontrado");
  }
});

// Actualizar un solo consionario
app.put("/concesionarios/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const index = concesionarios.findIndex((c) => c.id === id);
  if (index !== -1) {
    concesionarios[index] = { ...concesionarios[index], ...request.body };
    response.json({ message: "Concesionario actualizado" });
  } else {
    response.status(404).send("Concesionario no encontrado");
  }
});

// Borrar un elemento del array
app.delete("/concesionarios/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const index = concesionarios.findIndex((c) => c.id === id);
  if (index !== -1) {
    concesionarios.splice(index, 1);
    response.json({ message: "Concesionario eliminado" });
  } else {
    response.status(404).send("Concesionario no encontrado");
  }
});
