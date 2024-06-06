import movies from '../movies.json' with { type: 'json'}
import { randomUUID } from "node:crypto";

export class MovieModel {
  // Recuperar todos las peliculas
  // Filtrar por genero o por año
  static async getAll({ genre, year }) {
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

    return filteredMovies;
  }

  // Recuperar una pelicula mediante el id
  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  // Crear una pelicula
  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    };

    movies.push(newMovie);
    return newMovie;
  }

  // Eliminar una pelicula mediante el id
  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie Not Found" });
    }

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...result.data,
    };

    return movies[movieIndex];
  }
}
