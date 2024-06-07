import { MovieModel } from "../models/local-file-system/movie.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  // Recuperar todos las peliculas
  // Filtrar por genero o por año
  static async getAll(req, res) {
    const { genre, year } = req.query;
    const filteredMovies = await MovieModel.getAll({ genre, year });
    res.json(filteredMovies);
  }

  // Recuperar una pelicula mediante el id
  static async getById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie Not Found" });
  }

  // Crear una pelicula
  static async create(req, res) {
    const result = validateMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await MovieModel.create({ input: result.data });
    res.status(201).json(newMovie);
  }

  // Eliminar una pelicula mediante el id
  static async delete(req, res) {
    const { id } = req.params;
    const movieIndex = await MovieModel.delete({ id });

    if (!movieIndex) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted" });
  }

  // Actualizar una pelicula mediante el id
  static async update(req, res) {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updateMovie = await MovieModel.update({ id, input: result.data });

    return res.json(updateMovie);
  }
}
