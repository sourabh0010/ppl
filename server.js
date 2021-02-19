const express = require("express");
const app = express();
const keys=require("./config")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const AuthRouter = require("./router/authRoutes");
const UploadRouter = require("./router/uploadRoutes");


mongoose.connect(
 keys.mongouri,
  { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true },
  () => {
    console.log("connected");
  }
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.listen(3002, () => {
  console.log("running");
});
app.use("/auth", AuthRouter);
app.use("/upload", UploadRouter);
