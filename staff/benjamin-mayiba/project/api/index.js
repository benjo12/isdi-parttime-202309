import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import {
  registerUserHandler,
  authenticateUserHandler,
  retrieveUserHandler,
  createServiceHandler,
  createEventHandler,
  retrieveServiceHandler,
  retrieveEventHandler,
  deleteEventHandler,
  deleteServiceHandler,
  changeUserEmailHandler,
  changeUserPasswordHandler,
} from "./handlers/index.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    const server = express();
    const jsonBodyParser = express.json();

    server.get("/", (req, res) => res.send("Hello, World!"));

    server.use(cors());

    // crear un usuario
    server.post("/users", jsonBodyParser, registerUserHandler);

    // authenticar un usuario
    server.post("/users/auth", jsonBodyParser, authenticateUserHandler);

    // Obtener usuario
    server.get("/users", retrieveUserHandler);

    // Crear servicio
    server.post("/services", jsonBodyParser, createServiceHandler);

    // crear un evento
    server.post("/events", jsonBodyParser, createEventHandler);

    // obtener eventos

    server.get("/events", retrieveEventHandler);

    // obtener servicios

    server.get("/services", retrieveServiceHandler);

    // borrar un evento
    server.delete("/events/del", jsonBodyParser, deleteEventHandler);

    // borrar un servicio

    server.delete("/services/del", jsonBodyParser, deleteServiceHandler);

     // cambiar email
    server.patch('/users/change-email', jsonBodyParser,changeUserEmailHandler)

    // cambiar contraseña
    server.patch('/users/change-password', jsonBodyParser, changeUserPasswordHandler)

    server.listen(process.env.PORT, () =>
      console.log(`server running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.error(error));
