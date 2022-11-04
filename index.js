const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

// CONFIG
dotenv.config();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ROUTE
app.use("/api", routes);

// SERVER
mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true },
  (error, response) => {
    if (error) {
      return console.log("Error al conectarse a la base de datos " + error);
    }
    console.log("Conexion a la base de datos establecida");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor en marcha en el puerto ${process.env.PORT}`);
    });
  }
);
