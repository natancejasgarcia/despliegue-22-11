const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();

app.use(express.json());
app.use(helmet()); // Añadir seguridad con Helmet

const port = process.env.PORT || 8080;

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/concesionarioDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conexión exitosa a MongoDB"))
.catch((err) => console.error("No se pudo conectar a MongoDB", err));

// Esquema y modelo de Concesionario
const cocheSchema = new mongoose.Schema({
    modelo: String,
    cv: Number,
    precio: Number
});

const concesionarioSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    coches: [cocheSchema]
});

const Concesionario = mongoose.model("Concesionario", concesionarioSchema);

// GET /concesionarios
app.get("/concesionarios", async (req, res) => {
    try {
        const concesionarios = await Concesionario.find();
        res.json(concesionarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los concesionarios" });
    }
});

// POST /concesionarios
app.post("/concesionarios", async (req, res) => {
    const nuevoConcesionario = new Concesionario(req.body);
    try {
        await nuevoConcesionario.save();
        res.status(201).json(nuevoConcesionario);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el concesionario" });
    }
});

// GET /concesionarios/:id
app.get("/concesionarios/:id", async (req, res) => {
    try {
        const concesionario = await Concesionario.findById(req.params.id);
        if (!concesionario) {
            return res.status(404).send("Concesionario no encontrado");
        }
        res.json(concesionario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el concesionario" });
    }
});

// PUT /concesionarios/:id
app.put("/concesionarios/:id", async (req, res) => {
    try {
        const concesionarioActualizado = await Concesionario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!concesionarioActualizado) {
            return res.status(404).send("Concesionario no encontrado");
        }
        res.json(concesionarioActualizado);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el concesionario" });
    }
});

// DELETE /concesionarios/:id
app.delete("/concesionarios/:id", async (req, res) => {
    try {
        const concesionarioEliminado = await Concesionario.findByIdAndDelete(req.params.id);
        if (!concesionarioEliminado) {
            return res.status(404).send("Concesionario no encontrado");
        }
        res.json({ message: "Concesionario eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el concesionario" });
    }
});

// Las rutas para los coches se manejarán de manera similar, utilizando el modelo `Concesionario`
// y aplicando las operaciones correspondientes en el array `coches`.

app.listen(port, () => {
    console.log(`Servidor desplegado en puerto: ${port}`);
});
