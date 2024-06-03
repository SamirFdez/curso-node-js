// Usando CommonJS
const { readFile } = require("node:fs/promises");

// envolver las funciones en una funcion auto invocada
// IIFE - Inmediatly Invoked Function Expression

(async () => {
  console.log("Leyendo el primer archivo...");
  const text = await readFile("./archivo.txt", "utf-8");
  console.log("primer texto:", text);

  console.log("Hacer otras cosas mientras lee el archivo...");

  console.log("Leyendo el segundo archivo...");
  const secondText = await readFile("./archivo2.txt", "utf-8");
  console.log("segundo texto:", secondText);
})();

// envolver las funciones en una funcion async normal

async function init() {
  console.log("Leyendo el primer archivo...");
  const text = await readFile("./archivo.txt", "utf-8");
  console.log("primer texto:", text);

  console.log("Hacer otras cosas mientras lee el archivo...");

  console.log("Leyendo el segundo archivo...");
  const secondText = await readFile("./archivo2.txt", "utf-8");
  console.log("segundo texto:", secondText);
}

init();
