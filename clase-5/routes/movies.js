import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const moviesRouter = Router();

// Recuperar todos las peliculas
// Filtrar por genero o por año
moviesRouter.get("/", MovieController.getAll);

// Recuperar una pelicula mediante el id
moviesRouter.get("/:id", MovieController.getById);

// Crear una pelicula
moviesRouter.post("/", MovieController.create);

// Eliminar una pelicula mediante el id
moviesRouter.delete("/:id", MovieController.delete);

// Actualizar una pelicula mediante el id
moviesRouter.patch("/:id", MovieController.update);
