import fs from 'node:fs/promises';
import path from 'node:path';

try {
  for await (const filename of fs.glob('src/components/*')) {
    const stats = await fs.lstat(filename);
    if (stats.isDirectory()) checkDirectory(filename);
  }
} catch (err) {
  console.error(err);
}

async function checkDirectory(directoryPath) {
  const files = await fs.readdir(directoryPath);
  const component = path.basename(directoryPath);
  let missingFileNames = ['index.js', component + '.js'];

  for (const file of files) {
    const fileName = path.basename(file);
    if (missingFileNames.includes(fileName)) {
      missingFileNames = missingFileNames.filter((n) => n !== fileName);
    }
  }

  for (const fileName of missingFileNames) {
    console.log(`Structure of component ${component} is broken! Missing ${fileName}`)
  }
}
