import util from "util";
import multer from "multer";

const maxSize = 100 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./tmp/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

export const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

export const uploadFileMiddleware = util.promisify(uploadFile);
