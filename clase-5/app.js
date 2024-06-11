import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { createMovieRouter } from "./routes/movies.js";
// import { MovieModel } from "./models/mysql/movie.js";

export const createApp = ({ movieModel }) => {
  const PORT = process.env.PORT ?? 1234;

  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");
  app.use("/movies", createMovieRouter({ movieModel }));

  app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}}`);
  });
};
