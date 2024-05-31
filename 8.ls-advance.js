const fs = require("node:fs/promises");
const path = require("node:path");
const picocolors = require("")

const folder = process.argv[2] ?? ".";

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch {
    console.log(`No se pudo leer el directorio ${folder}`);
    process.exit(1);
  }
  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch {
      console.log(`No se pudo leer el archivo ${filePath}`);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "d" : "f";
    const fileSize = `${(stats.size / 1024).toFixed(1)} KB`;
    const fileModifidied = stats.mtime.toLocaleString();

    return `${fileType} ${file.padEnd(30)} ${fileSize.padStart(
      10
    )} ${fileModifidied}`;
  });

  const filesInfo = await Promise.all(filePromises);
  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(folder);
