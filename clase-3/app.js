const express = require("express");
const movies = require("./movies.json");

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by");

// Todos los recursos que sean MOVIES se identifican con /movies
app.get("/movies", (req, res) => {
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

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: "Movie Not Found" });
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}}`);
});
