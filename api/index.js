const express = require("express");
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

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB Error:", err));

// Middleware
app.use(cors());



app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// File Upload (If needed)

app.use(cors({
  origin: "https://socialbook-app.vercel.app/",
  credentials: true
}));


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
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// Export app for Vercel

app.get("/", (req, res) => {
  res.send("Welcome to the Social Media App API");
});

module.exports = app;
