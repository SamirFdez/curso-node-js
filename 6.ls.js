const fs = require("node:fs");

fs.readdir(".", (err, files) => {
  if (err) {
    console.log("error al intentar leer el directorio: ", err);
    return;
  }

  files.forEach((file) => {
    console.log(file);
  });
});
