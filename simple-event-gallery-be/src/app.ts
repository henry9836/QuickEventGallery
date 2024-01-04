import express from 'express';
import cors from 'cors';

import config from './config.json';
import multer from "multer";
import {generateUniqueFilename} from "./tools";
import {getNewGalleryData, uploadNewFileDb} from "./databaseUtility";

const app = express();
const port = 8001;

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    cb(null, `${generateUniqueFilename(file.originalname)}`);
  }
});

const upload = multer({storage});

app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use('/tmp', express.static('tmp'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/gallery', async (req, res)=>{
  const offset = req.query.offset;
  const eventId = req.query.eventId;

  const offsetNumber = Number(offset);
  const eventIdNumber = Number(eventId);

  if (typeof offsetNumber === 'number') {
    if (typeof eventIdNumber === 'number') {
      const results = await getNewGalleryData(eventIdNumber, offsetNumber);
      console.log(results);
      res.send(results);
    }
    else {
      res.send("Error when trying to load gallery data");
    }
  }
  else {
    res.send("Error when trying to load gallery data");
  }
});

app.post('/api/upload', upload.single("file"), async (req, res) => {
  const file = req.file;

  const eventId = req.body.eventId;
  const eventIdNumber = Number(eventId);

  if (file){
    res.json(file);
    await uploadNewFileDb(file.filename, eventIdNumber);
  }
  else{
    throw new Error("File upload failed")
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
