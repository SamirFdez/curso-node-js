const dittoJSON = require("./pokemon/ditto.json");
const express = require("express");
const app = express();

app.disable("x-powered-by");

const PORT = process.env.PORT ?? 1234;

app.use(express.json());

// app.use((req, res, next) => {
//   if (req.method !== "POST") return next();
//   if (req.headers["content-type"] !== "application/json") return next();

//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   req.on("end", () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();
//     req.body = data;
//     next();
//   });
// });

app.get("/pokemon/ditto", (req, res) => {
  res.json(dittoJSON);
});

app.post("/pokemon", (req, res) => {
  req.body.timestamp = Date.now();
  res.status(201).send(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}}`);
});
