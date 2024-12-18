import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors"

const PORT =  5000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const upload = multer({storage: fileStorage});

const corsOptions = {
    origin: "http://localhost:5173", // Remove trailing slash
    credentials: true, // Fix typo: "credentails" to "credentials"
    optionsSuccessStatus: 200, // Fix typo: "optionSuccessStatus" to "optionsSuccessStatus"
  };
  app.use(cors(corsOptions));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file)
    res.send("file upload sucessfull")
})

app.post("/multiple", upload.array("images", 3), (req,res) => {
    console.log(req.files);
    res.send("files uploaded successful")
})


app.listen(PORT, () => console.log(`app listenning on port ${PORT}`))