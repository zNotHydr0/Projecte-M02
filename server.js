require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexió a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectat a MongoDB - IslaDB"))
    .catch(err => console.log(err));

// Rutes
const hogueraRoutes = require('./routes/hogueraRoutes');
const participanteRoutes = require('./routes/participanteRoutes');

app.use('/hogueras', hogueraRoutes);
app.use('/participantes', participanteRoutes);

// Ruta inicial
app.get('/', (req, res) => res.send("API Isla en funcionament!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en marxa a http://localhost:${PORT}`));