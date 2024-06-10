import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "admin123456",
  database: "moviesdb",
};

const connection = await mysql.createConnection(config);

const queryGetMovieById = `      
  SELECT 
    BIN_TO_UUID(m.id) AS id, 
    m.title, 
    m.year, 
    m.director, 
    m.duration, 
    m.poster, 
    m.rate, 
    GROUP_CONCAT(g.descripcion) AS genres
  FROM 
    movie m
  LEFT JOIN 
    movie_genres mg ON m.id = mg.movie_id
  LEFT JOIN 
    genre g ON mg.genre_id = g.id
  WHERE 
    m.id = UUID_TO_BIN(?)
  GROUP BY 
    m.id;
`;

export class MovieModel {
  // Recuperar todos las peliculas
  // Filtrar por genero o por año
  static async getAll({ genre, year }) {
    let query = `
      SELECT
        BIN_TO_UUID(m.id) id,
        m.title, 
        m.year, 
        m.director, 
        m.duration, 
        m.poster, 
        m.rate, 
        GROUP_CONCAT(g.descripcion SEPARATOR ', ') AS genres
      FROM 
        movie m
      LEFT JOIN 
        movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN 
        genre g ON mg.genre_id = g.id
    `;

    const conditions = [];
    const params = [];

    if (genre) {
      query += `
        WHERE m.id IN (
          SELECT mg.movie_id
          FROM movie_genres mg
          LEFT JOIN genre g ON mg.genre_id = g.id
          WHERE g.descripcion = ?
        )
      `;
      params.push(genre);
    }

    if (year) {
      conditions.push("m.year = ?");
      params.push(year);
    }

    if (conditions.length > 0) {
      query += genre ? " AND " : " WHERE ";
      query += conditions.join(" AND ");
    }

    query += " GROUP BY m.id";
    const [movies] = await connection.query(query, params);

    const formattedMovies = movies.map((movie) => ({
      ...movie,
      genres: movie.genres ? movie.genres.split(", ") : [],
    }));

    return formattedMovies;
  }

  // Recuperar una pelicula mediante el id
  static async getById({ id }) {
    if (id.length !== 36) return null;
    const params = [id];
    const [movies] = await connection.query(queryGetMovieById, params);

    if (movies.length === 0) return null;

    return movies[0];
  }

  // Crear una pelicula
  static async create({ input }) {
    const {
      gnere: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate,
    } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    const queryInsert = `
      INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
      (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`;

    try {
      await connection.query(queryInsert, [
        title,
        year,
        director,
        duration,
        poster,
        rate,
      ]);
    } catch (error) {
      throw new Error("Error creating movie");
    }

    const [movies] = await connection.query(queryGetMovieById, [uuid]);
    return movies[0];
  }

  // Eliminar una pelicula mediante el id
  static async delete({ id }) {
    if (id.length !== 36) return false;
    const params = [id];
    const [movies] = await connection.query(queryGetMovieById, params);

    if (movies.length === 0) return false;

    try {
      await connection.query(
        `DELETE FROM movie
        WHERE id = UUID_TO_BIN(?)`,
        params
      );
    } catch (error) {
      throw new Error("Error deleting movie");
    }

    return true;
  }

  // Actualizar una pelicula mediante el id
  static async update({ id, input }) {
    if (id.length !== 36) return false;
    const params = [id];
    const [movies] = await connection.query(queryGetMovieById, params);

    if (movies.length === 0) return false;

    console.log(input);

    return false;
  }
}
