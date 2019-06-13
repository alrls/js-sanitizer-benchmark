import fs from 'fs';
import { promisify } from 'util';
import sanitizeFunctions from './modules';

const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

const MAP_INDEX_TO_FUNC_NAMES = [
  'bleach', 'bluemonday', 'insane', 'sanitizer', 'sanitizeHtml', 'xss', 'xssFilters'
];

let lineCount = 0;
const globalRating = {
  bleach: { count: 0, time: 0 },
  bluemonday: { count: 0, time: 0 },
  insane: { count: 0, time: 0 },
  sanitizer: { count: 0, time: 0 },
  sanitizeHtml: { count: 0, time: 0 },
  xss: { count: 0, time: 0 },
  xssFilters: { count: 0, time: 0 }
};

function calcWorkingTime(func, arg) {
  const startTime = new Date().getTime();
  const funcResult = func(arg);
  const endTime = new Date().getTime();
  return {
    result: funcResult,
    time: endTime - startTime
  };
}

function trySanitize(string) {
  sanitizeFunctions.forEach((func, index) => {
    const { result, time } = calcWorkingTime(func, string);
    if (result !== string) {
      const functionName = MAP_INDEX_TO_FUNC_NAMES[index];
      globalRating[functionName].count += 1;
      globalRating[functionName].time += time;
    }
  });
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
      trySanitize(line);
    });
  });

  // eslint-disable-next-line no-console
  console.log(lineCount, globalRating);
}
main();
