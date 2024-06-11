// import { MovieModel } from "../models/local-file-system/movie.js";
// import { MovieModel } from "../models/mysql/movie.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }

  // Recuperar todos las peliculas
  // Filtrar por genero o por año
  getAll = async (req, res) => {
    const { genre, year } = req.query;
    const filteredMovies = await this.movieModel.getAll({ genre, year });
    res.json(filteredMovies);
  };

  // Recuperar una pelicula mediante el id
  getById = async (req, res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie Not Found" });
  };

  // Crear una pelicula
  create = async (req, res) => {
    const result = validateMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await this.movieModel.create({ input: result.data });
    res.status(201).json(newMovie);
  };

  // Eliminar una pelicula mediante el id
  delete = async (req, res) => {
    const { id } = req.params;
    const movieIndex = await this.movieModel.delete({ id });

    if (!movieIndex) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted" });
  };

  // Actualizar una pelicula mediante el id
  update = async (req, res) => {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updateMovie = await this.movieModel.update({
      id,
      input: result.data,
    });

    if (!updateMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json(updateMovie);
  };
}
