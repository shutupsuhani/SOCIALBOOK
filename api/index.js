//api ..index.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const postRoute = require("./routes/posts");
const cors = require("cors");
const path = require("path");
const multer = require("multer");


dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
   
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

app.use(cors());

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS")); 
    }
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
}));


//app.use("/images",express.static(path.join(__dirname,"/public/images")));

app.use("/images", express.static(path.join(__dirname, "public/images")));



//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


 const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, "public/images");
   },
   filename: (req, file, cb) => {
     cb(null, req.body.name);
   },
 });
 
 const upload = multer({ storage: storage });
 app.post("/api/upload", upload.single("file"), (req, res) => {
   try {
     return res.status(200).json("File uploded successfully");
   } catch (error) {
     console.error(error);
   }
 });

app.use("/api/users", userRoute );
app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);



app.listen(process.env.PORT, () => {
    console.log('connected to Server on port 8800');
}); 





