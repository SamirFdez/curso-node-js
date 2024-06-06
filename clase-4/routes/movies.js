import { Router } from "express";
import { randomUUID } from "node:crypto";
import movies from '../movies.json' with { type: 'json'}
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export const moviesRouter = Router();

// Recuperar todos las peliculas
// Filtrar por genero o por año
moviesRouter.get("/", (req, res) => {
  const { genre, year } = req.query;
  let filteredMovies = movies;

  if (genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
  }

  if (year) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.year.toString() === year
    );
  }
  res.json(filteredMovies);
});

// Recuperar una pelicula mediante el id
moviesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: "Movie Not Found" });
});

// Crear una pelicula
moviesRouter.post("/", (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Actualizar una pelicula mediante el id
moviesRouter.patch("/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie Not Found" });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;
  return res.json(updateMovie);
});

// Eliminar una pelicula
moviesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  return res.json({ message: "Movie deleted" });
});
