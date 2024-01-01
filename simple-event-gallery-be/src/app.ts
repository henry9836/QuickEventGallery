import express from 'express';

import { uploadNewFile } from './databaseUtility.js';
import config from './config.json';

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  uploadNewFile("testing.jpeg").then((result) => {
    console.log(result); // Print the result returned from insertNewFile
  });

  return console.log(`Express is listening at http://localhost:${port}`);
});
