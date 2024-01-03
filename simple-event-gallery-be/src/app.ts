import express from 'express';
import cors from 'cors';

import { uploadFile } from './uploadhandler.js'
import { uploadNewFileDb } from './databaseUtility.js';
import config from './config.json';

const app = express();
const port = 8001;

app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/upload', async (req, res) => {

  try {
    await uploadFile(req, res);

  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 10MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file. ${err}`,
    });
  }

  console.log("GOT RESPONSE");
  console.log(req);

  const file : File = req['file'];

  console.log(file);

  //res.set('Access-Control-Allow-Origin', `http://localhost:4200`);
  res.send({ping: "Hello from backend!"});

  //uploadNewFileDb("from frontend.png");

});

app.listen(port, () => {
  uploadNewFileDb("testing.jpeg").then((result) => {
    console.log(result); // Print the result returned from insertNewFile
  });

  return console.log(`Express is listening at http://localhost:${port}`);
});
