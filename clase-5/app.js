import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { moviesRouter } from "./routes/movies.js";

const PORT = process.env.PORT ?? 1234;

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");
app.use("/movies", moviesRouter);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}}`);
});
