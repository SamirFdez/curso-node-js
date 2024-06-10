import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "admin123456",
  database: "moviesdb",
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  // Recuperar todos las peliculas
  // Filtrar por genero o por año
  static async getAll({ genre, year }) {
    const [movies] = await connection.query(
      "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;"
    );

    return movies;
  }

  // Recuperar una pelicula mediante el id
  static async getById({ id }) {}

  // Crear una pelicula
  static async create({ input }) {}

  // Eliminar una pelicula mediante el id
  static async delete({ id }) {}

  // Actualizar una pelicula mediante el id
  static async update({ id, input }) {}
}
