import fs from 'fs';
import { promisify } from 'util';
import sanitizeFunctions from './modules';

const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

const MAP_INDEX_TO_FUNC_NAMES = [
  'bleach', 'bluemonday', 'insane', 'sanitizer', 'sanitizeHtml', 'xssFilters'
];

let lineCount = 0;
const globalRating = {
  bleach: 0,
  bluemonday: 0,
  insane: 0,
  sanitizer: 0,
  sanitizeHtml: 0,
  xssFilters: 0
};

function getSuccessfulSanitizers(string) {
  const successfulSanitizers = [];

  sanitizeFunctions.forEach((func, index) => {
    const sanitizedLine = func(string);
    if (sanitizedLine !== string) {
      successfulSanitizers.push(MAP_INDEX_TO_FUNC_NAMES[index]);
    }
  });

  return successfulSanitizers;
}

async function main() {
  const pathToFolder = process.argv[2];
  const files = await readdirAsync(pathToFolder);

  const readFilePromises = files.map(item => {
    const pathToFile = `${pathToFolder}/${item}`;
    return readFileAsync(pathToFile, 'utf8');
  });
  const fileContentArray = await Promise.all(readFilePromises);

  fileContentArray.forEach(fileContent => {
    const lines = fileContent.split('\n');
    lines.forEach(line => {
      if (!line) {
        return;
      }
      
      lineCount += 1;
      const successfulSanitizers = getSuccessfulSanitizers(line);
      successfulSanitizers.forEach(sanitizerName => {
        globalRating[sanitizerName] += 1;
      });
    });
  });

  // eslint-disable-next-line no-console
  console.log(lineCount, globalRating);
}
main();
