const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// connect to database
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.l9ikg.mongodb.net/multer?retryWrites=true&w=majority`
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// all route
// app.use("/api/test", testRoute);

app.listen(port, () => {
  connect();
  console.log("Connected  to backend");
});
