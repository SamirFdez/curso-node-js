import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });

  // Recuperar todos las peliculas
  // Filtrar por genero o por año
  moviesRouter.get("/", movieController.getAll);

  // Recuperar una pelicula mediante el id
  moviesRouter.get("/:id", movieController.getById);

  // Crear una pelicula
  moviesRouter.post("/", movieController.create);

  // Eliminar una pelicula mediante el id
  moviesRouter.delete("/:id", movieController.delete);

  // Actualizar una pelicula mediante el id
  moviesRouter.patch("/:id", movieController.update);

  return moviesRouter;
};
